'use client';

import {destinations} from '@/data/user-working-data/destinations'
import { useTimeout } from '@/hooks/use-timeout';
import Section from '@/components/platform/section';
import BlockLoader from '@/components/loader/block-loader';
import DestinationCarousel from './live-auction-carousel';
import { AuctionStatus } from '@/types/dashboard';
import { useGetAuctionsWithStatus } from '@/lib/v2/react-query-v2/queries-v2';

export default function TopAuction() {

// ko có fill theo status .... Lậu :)

  const { state } = useTimeout();
  const { data: liveAuction, isLoading } = useGetAuctionsWithStatus(AuctionStatus.LIVE);

  // số 6 là live nhé mốt sửa đi chú
  const auctionFilterByStatus = liveAuction?.data.filter((auction) => Number(auction.status)  ===  6)

  return (
    <Section
      title="Live Auction"
      description=" Đấu Giá Thời Gian Thực, Dẫn Dắt Bởi Người Đấu Giá, Cạnh Tranh, Người Ra Giá Cao Nhất Chiến Thắng."
      className="lg:container-fluid mt-12 pl-4 sm:pl-6 lg:mt-16"
      headerClassName="mb-4 md:mb-5 xl:mb-6"
    >
      {!state && isLoading && <BlockLoader />}
      {state && <DestinationCarousel data={auctionFilterByStatus!} />}
    </Section>
  );
}
