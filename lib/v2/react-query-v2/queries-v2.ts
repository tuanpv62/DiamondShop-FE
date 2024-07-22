"use client";

import { ApiListResponse } from "@/lib/generics";

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys-v2";
import { getAuctionsWithStatusV2 } from "../actions-v2/auction-v2";

//AUCTION

export const useGetAuctionsWithStatus = (status: any) => {
  return useQuery<
    ApiListResponse<any>
    //   IAuction
  >({
    queryKey: [QUERY_KEYS.GET_AUCTIONS_V2, status],
    queryFn: () => getAuctionsWithStatusV2(status),
  });
};

// export const useGetTableAuction = () => {
//   return useQuery<ApiListResponse<IAuction>>({
//     queryKey: [QUERY_KEYS.GET_TBL_AUCTIONS],
//     queryFn: () => getAuctions(),
//   });
// };
