"use server";

import { AxiosResponse } from "axios";
import { api, axiosAuth } from "@/lib/api-interceptor/api";

export interface ApiListResponse<T> {
  data: T[];
  pageCount?: number;
}
export interface ApiSingleResponse<T> {
  data: T | null;
}

export async function fetchListData<T>(
  url: string,
  searchParams?: Record<string, any>
): Promise<ApiListResponse<T>> {
  try {
    const response: AxiosResponse<{
      payload: T[];
      metaData: {
        totalItemsCount: number;
        pageSize: number;
        totalPagesCount: number;
      };
    }> = await api.get(url, { params: searchParams });

    const { payload } = response.data;
    const { totalPagesCount } = response.data.metaData;

    return {
      data: payload,
      pageCount: totalPagesCount,
    };
  } catch (error) {
    console.log("ERROR fetching data", error);
    return { data: [], pageCount: 0 };
  }
}

export async function fetchSingleData<T>(
  url: string
): Promise<ApiSingleResponse<T>> {
  try {

    const response: AxiosResponse<{ payload: T }> = await api.get(url);

    const { payload } = response.data;

    return { data: payload };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: null };
  }
}
