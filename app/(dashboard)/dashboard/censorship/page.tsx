import React from "react";

import Integration from "./_components/integration";
import { getAuctionsWithStatusV2 } from "@/lib/v2/actions-v2/auction-v2";

const Integrations = () => {
  const auctionPromise = getAuctionsWithStatusV2("WAITING");


  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] min-h-screen">
      <React.Suspense fallback={<div>...Loading</div>}>
        <Integration auctionPromise={auctionPromise} />
      </React.Suspense>
    </main>
  );
};

export default Integrations;
