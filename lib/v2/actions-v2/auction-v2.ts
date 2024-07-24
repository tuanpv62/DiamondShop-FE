"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { SearchParams } from "@/types/table";
import axios from "axios";
import { AUCTION_URLS_V2 } from "./action-key-v2";
import {
  ApiListResponse,
  ApiSingleResponse,
  fetchListData,
  fetchSingleData,
} from "../generics-v2";
import { IAuction, IAuctionV2 } from "@/types/dashboard";

export async function getAuctionsWithStatusV2(
  status: string
): Promise<ApiListResponse<any>> {
  noStore();
  
  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS);
}

export async function getAuctionByIDV2(
  params: string
): Promise<ApiSingleResponse<IAuctionV2>> {
  noStore();

  return await fetchSingleData(AUCTION_URLS_V2.GET_AUCTION_BY_ID(params));
}

export async function getTableAuctionsV2(
  searchParams: SearchParams
): Promise<ApiListResponse<IAuctionV2>> {
  noStore();

  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS, searchParams);
}


