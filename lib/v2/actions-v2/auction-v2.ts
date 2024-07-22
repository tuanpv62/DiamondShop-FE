"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { SearchParams } from "@/types/table";
import axios from "axios";
import { AUCTION_URLS_V2 } from "./action-key-v2";
import { ApiListResponse, fetchListData } from "../generics-v2";

export async function getAuctionsWithStatusV2(
  status: string
): Promise<ApiListResponse<any>> {
  noStore();
  console.log("gohere");
  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS);
}
