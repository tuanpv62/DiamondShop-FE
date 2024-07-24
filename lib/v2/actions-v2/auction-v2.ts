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
import { IAuction } from "@/types/dashboard";

export async function getAuctionsWithStatusV2(
  status: string
): Promise<ApiListResponse<any>> {
  noStore();
  console.log("gohere");
  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS);
}

export async function getAuctionByIDV2(
  params: string
): Promise<ApiSingleResponse<IAuction>> {
  noStore();

  return await fetchSingleData(AUCTION_URLS_V2.GET_AUCTION_BY_ID(params));
}

export async function getTableAuctionsV2(
  searchParams: SearchParams
): Promise<ApiListResponse<IAuction>> {
  noStore();

  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS, searchParams);
}
