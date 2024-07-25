"use client";

import { useTimeout } from "@/hooks/use-timeout";
import { topBoats } from "@/data/user-working-data/top-boats";
import Section from "@/components/platform/section";
import SeeMore from "@/components/platform/see-more";
import ListingCardLoader from "@/components/loader/listing-card-loader";
import ListingCard from "./comming-auction-card";
import { AuctionStatus } from "@/types/dashboard";
import { useGetAuctionsWithStatus } from "@/lib/v2/react-query-v2/queries-v2";

function AuctionGrid() {
  const { data: commingAuction, isLoading } = useGetAuctionsWithStatus(
    AuctionStatus.COMING
  );

  // số 6 là live nhé mốt sửa đi chú
  const auctionFilterByStatus = commingAuction?.data.filter(
    (auction) => Number(auction.status) === 5
  );
  if (isLoading) {
    return <ListingCardLoader />;
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {auctionFilterByStatus?.slice(0, 8).map((item, index) => (
        <ListingCard
          key={`top-boat-grid-${index}`}
          id={item.auctionId}
          idCss={`top-boat-grid-${index}`}
          productName={item.productName}
          productCode={item.productCode}
          startPrice={item.startPrice}
          endPrice={item.endPrice}
          status={item.status}
          depositPrice={item.depositPrice}
          quantity={item.quantity}
          modifiedBy={item.modifiedBy}
          created_at={item.created_at}
          updated_at={item.updated_at}
          remindAt={item.remindAt}
          image_url={item.image_url}
          startDate={item.startDate!}
        />

        // <ListingCard
        //   key={`top-boat-grid-${index}`}
        //   idCss={`top-boat-grid-${index}`}
        //   slides={item.thumbnail}
        //   time={item.time}
        //   caption={item.caption}
        //   title={item.title}
        //   slug={item.slug}
        //   location={item.location}
        //   price={item.price}
        //   ratingCount={item.ratingCount}
        //   rating={item.rating}
        //   user={item.user}
        // />
      ))}
    </div>
  );
}

export default function LiveAuctions() {
  const { state } = useTimeout();

  return (
    <Section
      className="group/section container-fluid mt-12 overflow-hidden lg:mt-16"
      title="Coming Auction"
      description="Hãy Tham Gia Cùng Chúng Tôi Cho Một Buổi Đấu Giá Buổi Tối Đầy Mê Hoặc Của Những Viên Đá Quý Hiếm Và Đặc Biệt."
      headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
      rightElement={<SeeMore />}
    >
      {!state && <ListingCardLoader />}
      {state && <AuctionGrid />}
    </Section>
  );
}
