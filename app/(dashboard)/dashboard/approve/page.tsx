import React from "react";

import { getAuctionsWithStatusV2 } from "@/lib/v2/actions-v2/auction-v2";
import Confirm from "./_components/approve";
import Approve from "./_components/approve";

const ConfirmPage = () => {
  const auctionPromise = getAuctionsWithStatusV2("CONFIRM");

  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] min-h-screen">
      <React.Suspense fallback={<div>...Loading</div>}>
        <Approve auctionPromise={auctionPromise} />
      </React.Suspense>
    </main>
  );
};

export default ConfirmPage;
