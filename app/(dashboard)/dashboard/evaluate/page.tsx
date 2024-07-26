import React from "react";

import { getAuctionsFilterWithStatus, getAuctionsWithStatusV2 } from "@/lib/v2/actions-v2/auction-v2";
import Evaluate from "./_components/evaluate";

const EvaluatePage = () => {
  // const auctionPromise = getAuctionsWithStatusV2("WAITING");

  const auctionPromise = getAuctionsFilterWithStatus("0");


  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] min-h-screen">
      <React.Suspense fallback={<div>...Loading</div>}>
        <Evaluate auctionPromise={auctionPromise} />
      </React.Suspense>
    </main>
  );
};

export default EvaluatePage;
