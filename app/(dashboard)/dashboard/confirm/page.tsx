import React from "react";

import { getAuctionsFilterWithStatus, getAuctionsWithStatusV2 } from "@/lib/v2/actions-v2/auction-v2";
import Confirm from "./_components/confirm";

const ConfirmPage = () => {
  // const auctionPromise = getAuctionsWithStatusV2("CONFIRM");
  const auctionPromise = getAuctionsFilterWithStatus("2");


  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] min-h-screen">
      <React.Suspense fallback={<div>...Loading</div>}>
        <Confirm auctionPromise={auctionPromise} />
      </React.Suspense>
    </main>
  );
};

export default ConfirmPage;
