"use server";

import { revalidatePath } from "next/cache";
import { axiosAuth } from "@/lib/api-interceptor/api";
import { IWallet } from "@/types/dashboard";
import {
  ApiSingleResponse,
  fetchSingleData,
  fetchSingleDataTOWALLET,
} from "@/lib/generics";

export async function getWalletByUserId(
  params: string
): Promise<ApiSingleResponse<IWallet>> {
  const url = `/wallet/getwalletbyuserid`;
  return await fetchSingleDataTOWALLET(url);
}

export async function addMoneyToWallet(
  userId: string,
  price: number
): Promise<string | null> {
  const url = `/wallets/recharge-wallet-by-userId/${userId}`;

  try {
    const res = await axiosAuth.post(url, { recharge: price });

    if (res.status === 200 && res.data.status === "SUCCESS") {
      return res.data.payload;
    } else {
      console.error("Error:", res.data.error);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addMoneyToWalletV2(
  userId: string,
  price: number
): Promise<string | null> {
  const url = `/payment/create_recharge-payment-url/`;

  try {
    const res = await axiosAuth.post(url, { amount: price });

    if (res.status === 200) {
      return res.data.url;
    } else {
      console.error("Error:", res.data.error);
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
