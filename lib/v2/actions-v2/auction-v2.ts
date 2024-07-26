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
import { IAuction, IAuctionCreateField, IAuctionV2 } from "@/types/dashboard";
import { axiosAuth } from "@/lib/api-interceptor/api";
import { IProductCreateV2 } from "./product-v2";

export async function getAuctionsWithStatusV2(
  status: string
): Promise<ApiListResponse<any>> {
  noStore();

  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS);
}
export async function getAuctionsFilterWithStatus(
  status: string
): Promise<ApiListResponse<any>> {
  noStore();

  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS_WITH_STATUS(status));
}

export async function getAuctionByIDV2(
  params: string
): Promise<ApiSingleResponse<IAuction>> {
  noStore();

  return await fetchSingleData(AUCTION_URLS_V2.GET_AUCTION_BY_ID(params));
}

export async function getTableAuctionsV2(
  searchParams: SearchParams
): Promise<ApiListResponse<IAuctionV2>> {
  noStore();

  return await fetchListData(AUCTION_URLS_V2.GET_AUCTIONS, searchParams);
}

export async function createAuctionV2(data: IProductCreateV2): Promise<void> {
  noStore();

  try {
    await axiosAuth.post(AUCTION_URLS_V2.CREATE_AUCTIONS, data);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function createAuctionV3(data: IAuctionCreateField): Promise<void> {
  noStore();

  try {
    await axiosAuth.post(AUCTION_URLS_V2.CREATE_AUCTIONS, data);

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateStatusAcceptAuctionv2({ id, approved }: any) {
  try {
    const res = await axiosAuth.put(
      AUCTION_URLS_V2.UPDATE_AUCTIONS_EVALUATE(id),
      {
        approved: approved,
      }
    );

    revalidatePath("/dashboard/censorship");
  } catch (error) {
    console.log("FALI to updateStatusAcceptAuction");
  }
}

export async function updateAuctionDetailV2(
  params: string,
  data: IAuctionCreateField
): Promise<void> {
  noStore();

  try {
    await axiosAuth.put(
      AUCTION_URLS_V2.UPDATE_AUCTIONS_SET_WAITING(params),
      data
    );

    revalidatePath("/dashboard/evaluate");
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getAuctionByUserIdV2(
  searchParams: SearchParams,
  userId: string
): Promise<ApiListResponse<IAuctionV2>> {
  noStore();
  const url = `/transactions?userId=${userId}`;

  return await fetchListData(url, searchParams);
}


export async function getTableAuctionsV2withUser(
  searchParams: SearchParams,
  userId: string,
): Promise<ApiListResponse<IAuction>> {
  noStore();

  return await fetchListData(
    AUCTION_URLS_V2.GET_AUCTION_BY_USERID(userId),
    searchParams
  );
}