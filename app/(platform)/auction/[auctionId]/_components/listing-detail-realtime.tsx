"use client";
import { vendorData } from "@/data/user-working-data/listing-details";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { IAuction } from "@/types/dashboard";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { biddingAuction } from "@/lib/actions/bidding";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ListingDetailsHeroBlock from "@/components/platform/auction/hero-block";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface ListingDetailsProps {
  auctionId: string;
}

export default function ListingDetailsRealTime({
  auctionId,
}: ListingDetailsProps) {
  const [auctionData, setAuctionData] = useState<IAuction | null>(null);

  useEffect(() => {
    const auctionRef = doc(db, "auctions", auctionId);
    const unsubscribe = onSnapshot(auctionRef, (snapshot) => {
      setAuctionData(snapshot.data() as IAuction);
    });

    return () => {
      unsubscribe();
    };
  }, [auctionId]);
  const minimumPrice = auctionData?.startPrice || 0;
  const biddingPrice = auctionData?.biddingPrice || minimumPrice;
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const { onOpen } = useModal();

  const BiddingSchema = z.object({
    manualBidAmount: z.coerce
      .number()
      .min(10000, "Please enter a bid amount of 10000 or higher")
      .max(10000000000000, "số tiền quá mức quy định")
      .refine((value) => value > biddingPrice, {
        message: "Nhập giá tiền lớn hơn giá hiện tại mới đấu giá được",
      }),
  });

  const form = useForm<z.infer<typeof BiddingSchema>>({
    resolver: zodResolver(BiddingSchema),
    defaultValues: {
      manualBidAmount: biddingPrice,
    },
  });

  const isRegisterAuction = auctionData?.bidList.some(
    (item) => item.userId === session?.user.userId
  );

  const isStatusComing = auctionData?.status.toString() === "5";

  const isStatusLive = auctionData?.status.toString() === "6";
  const canBid = isRegisterAuction && isStatusLive;

  // need to optimize
  const handleBidding = async (bidAmount: number) => {
    if (canBid && bidAmount !== null) {
      try {
        setIsLoading(true);
        // const userId = session?.user.userId!;
        const bidIdToAuction = auctionData.bidList.filter(
          (item) => item.userId === session?.user.userId!
        )[0].bidId;

 
        const auctionId = auctionData.auctionId.toString();

        // todo
        const { success, error } = await biddingAuction(bidIdToAuction,bidAmount,auctionId);
        if (success) {
          toast.success("Tăng giá thành công");
        } else if (error) {
          toast.error(error);
        } else {
          toast.error("Có lỗi xảy ra trong quá trình đấu giá");
        }
      } catch (error) {
        toast.error("An unexpected error occurred");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Thời gian không thích hợp để đấu giá");
    }
  };

  const onSubmit = async (values: z.infer<typeof BiddingSchema>) => {
    await handleBidding(values.manualBidAmount);
  };

  return (
    <>
      <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
        <div className="w-full">
          {!isRegisterAuction && isStatusComing && (
            <Button
              variant="primary"
              onClick={() =>
                onOpen("registerAtendAction", { auction: auctionData })
              }
              className="mt-6"
            >
              Open Register Auction
            </Button>
          )}

          {!isRegisterAuction && isStatusLive && (
            <div>Registration deadline has passed</div>
          )}
          <ListingDetailsHeroBlock
            vendor={vendorData.vendor}
            auction={auctionData}
          />

          <div className="bg-slate-200 p-4 rounded-md">
            <div className="space-y-3">
              <h1 className="font-bold text-2xl space-y-2">Đấu giá ngay</h1>
              <p>Giá đấu giá hiện tại là : ${biddingPrice}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="manualBidAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              className="text-bgray-800 text-base border focus-visible:ring-0 focus-visible:ring-offset-0 border-bgray-300 dark:border-darkblack-400 dark:bg-darkblack-500 dark:text-white h-14 w-full focus:border-success-300 focus:ring-0 rounded-lg px-4 py-3.5 placeholder:text-bgray-500 placeholder:text-base"
                              placeholder="e.g., 10000"
                              disabled={isLoading}
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={!canBid || isLoading}
                      className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Place Bid
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            <div className="mt-4 relative">
              <Button
                onClick={() =>
                  handleBidding(biddingPrice + auctionData?.depositPrice!)
                }
                disabled={!canBid || isLoading}
                className="bg-gray-300 absolute top-[-56px] left-[140px] text-gray-700 py-2 px-4 rounded-lg hover:bg-green-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Raise (${auctionData?.depositPrice})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
