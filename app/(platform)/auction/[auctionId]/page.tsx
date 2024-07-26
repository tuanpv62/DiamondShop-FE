import React from "react";
import { reviewsData } from "@/data/user-working-data/reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeftSideAuction from "@/components/platform/auction/left-side-auction";
import RelatedListingBlock from "@/components/platform/auction/related-listings-block";
import BreadCrumb from "@/components/platform/bread-crumb";
import { getAuctionByID, getFeedBackAuction } from "@/lib/actions";
import Bidding from "./_components/bidding";
import BiddingHistory from "./_components/bidding-history";
import ListingDetails from "./_components/listing-detail-block";
import ListingDetailsRealTime from "./_components/listing-detail-realtime";
import ReviewBlock from "./_components/review";
import { getAuctionByIDV2 } from "@/lib/v2/actions-v2/auction-v2";

const AuctionIdPage = async ({ params }: { params: { auctionId: string } }) => {
  const auction = await getAuctionByIDV2(params.auctionId);
  const feedback = getFeedBackAuction(params.auctionId);
  const isLive = auction.data?.status.toString() === "6";

  return (
    <>
      <BreadCrumb
        descriptionTitle="Auction Detail"
        middlePath="Buổi đấu giá"
        title="Sản phẩm"
        routeUrl="auction"
      />

      <div className="container mx-auto px-4 md:px-12 mt-10 mb-4 flex flex-col lg:flex-row">
        {/* passing productImages =  [{id, image_url}, {} ,{}]  */}
        <LeftSideAuction productId={auction.data?.productID!} />

        <div className="w-full lg:w-3/5 md:pl-4">
          <ListingDetailsRealTime
            auctionId={auction.data?.auctionId.toString()!}
          />

          <div className="mt-8 md:mt-0">
            <Tabs defaultValue="description" className="w-full lg:w-[700px]">
              <TabsList className="grid grid-cols-2 gap-4">
                <TabsTrigger
                  value="description"
                  className="p-2 text-center bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="bidding"
                  className="p-2 text-center bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Bidding History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description">
                <h1 className="text-2xl font-bold mb-4">Mô tả chi tiết</h1>
                <p>
                  {auction.data?.description
                    ? auction.data.description
                    : "Không có mô tả"}
                </p>
              </TabsContent>
              <TabsContent value="bidding" className="overflow-y-auto ">
                <BiddingHistory auctionId={String(auction.data?.auctionId)!} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12">
        <React.Suspense fallback={<div>...Loading</div>}>
          <ReviewBlock reviewsData={reviewsData} feedBackPromise={feedback} />
        </React.Suspense>
      </div>
      <div className="container mx-auto px-4 md:px-12">
        <RelatedListingBlock />
      </div>
    </>
  );
};

export default AuctionIdPage;
