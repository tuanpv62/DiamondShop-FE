"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { SearchParams } from "@/types/table";
import {
  ApiListResponse,
  ApiSingleResponse,
  fetchListData,
  fetchSingleData,
} from "@/lib/generics";
import { IOrder } from "@/types/dashboard";
import { api, axiosAuth } from "@/lib/api-interceptor/api";

export async function getOrders(
  searchParams: SearchParams
): Promise<ApiListResponse<IOrder>> {
  noStore();
  const url = `/order/get-all`;

  return await fetchListData(url, searchParams);
}

export async function getOrdersByUserId(): Promise<ApiListResponse<IOrder>> {
  noStore();
  const url = `/order/get-order-by-userid`;

  return await fetchListData(url);
}

export async function getOrdersByOrderId(
  searchParams: SearchParams,
  orderId: string
): Promise<ApiListResponse<IOrder>> {
  noStore();
  const url = `/order/get/${orderId}`;

  return await fetchListData(url, searchParams);
}

export async function getOrderId(
  params: string
): Promise<ApiSingleResponse<IOrder>> {
  noStore();
  const url = `/order/get/${params}`;

  return await fetchSingleData(url);

  // return await fetchDataByID(url);
}

export async function confirmOrderDelivery({ orderId, confirmed }: any) {
  try {
    const res = await axiosAuth.put(`/orders/${orderId}`, {
      confirmed: confirmed,
    });

    revalidatePath("/dashboard/orders");
  } catch (error) {
    console.log("FALI to updateStatusAcceptAuction");
  }
}
