import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { Shell } from "@/components/shell";
import React from "react";
import { SearchParams } from "@/types/table";
import { AuctionTable } from "./_components/auction-table";

import { getTableAuctionsV2 } from "@/lib/v2/actions-v2/auction-v2";
export interface IndexPageProps {
  searchParams: SearchParams;
}

const AuctionDashBoardPage = ({ searchParams }: IndexPageProps) => {
  const auctions = getTableAuctionsV2(searchParams);

  return (
    <>
      <div className="2xl:flex-1 w-full overflow-x-auto">
        <Shell>
          <React.Suspense
            fallback={
              <DataTableSkeleton columnCount={4} filterableColumnCount={2} />
            }
          >
            <AuctionTable auctionPromise={auctions} />
          </React.Suspense>
        </Shell>
      </div>
    </>
  );
};

export default AuctionDashBoardPage;
