"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import {
  ApiListResponse,
  fetchListData,
  fetchListDataV2,
  fetchListDataV3,
} from "@/lib/generics";

import { ITransaction } from "@/types/dashboard/transaction-type";

export async function getTransactions(
  searchParams: SearchParams
): Promise<ApiListResponse<ITransaction>> {
  noStore();
  const url = `/transaction/get-all`;

  revalidatePath("/");
  return await fetchListData(url, searchParams);
}

export async function getTransactionByUserId(): Promise<
  ApiListResponse<ITransaction>
> {
  noStore();

  const url = `/transaction/get-by-account`;

  return await fetchListDataV2(url);
}
