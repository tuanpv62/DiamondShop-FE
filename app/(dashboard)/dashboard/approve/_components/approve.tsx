"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import {
  getAuctionsWithStatus,
  setApproveAuction,
  setConfirmAuction,
  updateStatusAcceptAuction,
  updateStatusRejectAuction,
} from "@/lib/actions";
import { getAuctionsFilterWithStatus } from "@/lib/v2/actions-v2/auction-v2";
import { IAuction } from "@/types/dashboard";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { toast } from "sonner";

interface ApproveProps {
  auctionPromise: ReturnType<typeof getAuctionsFilterWithStatus>;
}

const Approve = ({ auctionPromise }: ApproveProps) => {
  const { data } = React.use(auctionPromise);
  // filter with waiting STATUS
  const auctionFilter = data.filter(
    (auction: IAuction) => Number(auction.status) === 3
  );

  const { onOpen } = useModal();
  const router = useRouter();

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
      {auctionFilter.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Hiện không có sản phẩm nào cần chấp nhận
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
                  ID :{auction.auctionId}
                </h3>
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  Mã code {auction.productCode}
                </span>
              </div>
            </div>
            <div className="">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Giá khởi điểm : {auction.startPrice}
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
                      setApproveAuction({
                        id: auction.auctionId,
                        responsibleBy: auction.modifiedBy,
                      }),
                      {
                        loading: "Đang cập nhật...",
                        success: (data: any) =>
                          `Cập nhật đấu giá thành công`,
                        error: (err) => `Lỗi xác nhận: ${err.message}`,
                      }
                    );
                  });
                }}
                className="text-base w-full text-green-600 font-medium h-12 rounded-md border border-green-600 hover:bg-green-600 hover:bg-opacity-75 hover:text-white transition-colors duration-300 ease-in-out"
              >
                Xác nhận
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
                Hủy
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Approve;