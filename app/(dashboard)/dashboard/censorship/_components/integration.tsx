"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import {
  getAuctionsWithStatus,
  updateStatusAcceptAuction,
  updateStatusRejectAuction,
} from "@/lib/actions";
import { updateStatusAcceptAuctionv2 } from "@/lib/v2/actions-v2/auction-v2";
import { IAuction } from "@/types/dashboard";
import Image from "next/image";
import React, { startTransition } from "react";
import { toast } from "sonner";

interface IntegrationProps {
  auctionPromise: ReturnType<typeof getAuctionsWithStatus>;
}

const Integration = ({ auctionPromise }: IntegrationProps) => {
  const { data } = React.use(auctionPromise);

  // filter with PENDING STATUS
  const auctionFilter = data.filter(
    (auction: IAuction) => Number(auction.status) === 0
  );

  const { onOpen } = useModal();

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      {auctionFilter.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Hiện không có buổi đấu giá nào cần duyệt
        </p>
      ) : (
        auctionFilter.map((auction) => (
          <div
            key={auction.auctionId}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative  "
          >
            <div className="flex mb-4 min-h-32 lg:min-h-16">
              <div className="shrink-0 mr-4">
                <Image
                  priority={true}
                  height={64}
                  width={64}
                  src={auction.image_url}
                  alt="Stack Overflow"
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="text-2xl text-gray-800 dark:text-white font-bold">
                  {auction.productName}
                </h3>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  Mã code {auction.productCode}
                </span>
              </div>
            </div>
            <div className="">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Giá khởi điểm : {auction.startPrice}
                {/* <div className="relative rounded-lg w-64 overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:-z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                  <input
                    placeholder={`${auction.startPrice}`}
                    className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-white placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                    type="text"
                  />
                </div> */}
              </p>
              {/* <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ngày bắt đầu: {auction.startPrice}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Ngày kết thúc : {auction.startPrice}
          </p> */}
            </div>

            <div className="flex justify-between space-x-4">
              <Button
                onClick={() => {
                  startTransition(() => {
                    toast.promise(
                      updateStatusAcceptAuctionv2({
                        id: auction.auctionId,
                        approved: true,
                      }),
                      {
                        loading: "Update...",
                        success: () => "Auction update successfully.",
                        error: () => "Dellete error",
                      }
                    );
                  });
                }}
                className="text-base w-full text-green-600 font-medium h-12 rounded-md border border-green-600 hover:bg-green-600 hover:bg-opacity-75 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Duyệt
              </Button>
              <Button
                // onClick={() => {
                //   startTransition(() => {
                //     toast.promise(
                //       updateStatusRejectAuction({
                //         id: auction.id,
                //         approved: true,
                //       }),
                //       {
                //         loading: "Update...",
                //         success: () => "Auction update successfully.",
                //         error: () => "Dellete error",
                //       }
                //     );
                //   });
                // }}
                onClick={() => onOpen("confirmAuction", { auction: auction })}
                className="text-base w-full text-red-600 font-medium h-12 rounded-md border border-red-600 hover:bg-red-600 hover:bg-opacity-75 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Từ chối
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Integration;
