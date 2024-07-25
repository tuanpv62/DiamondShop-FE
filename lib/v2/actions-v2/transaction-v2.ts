"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";

import { ITransaction } from "@/types/dashboard/transaction-type";
import { ApiListResponse, fetchListData } from "../generics-v2";
import { IAuctionV2 } from "@/types/dashboard";

export async function getTransactions(
  searchParams: SearchParams
): Promise<ApiListResponse<ITransaction>> {
  noStore();
  const url = `/transactions`;

  revalidatePath("/");
  return await fetchListData(url, searchParams);
}

export async function getTransactionByUserId(
  searchParams: SearchParams,
  userId: string
): Promise<ApiListResponse<ITransaction>> {
  noStore();
  const url = `/transactions?userId=${userId}`;

  return await fetchListData(url, searchParams);
}


