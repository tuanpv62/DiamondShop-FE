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
    }> = await axiosAuth.get(url, { params: searchParams });

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

export async function fetchListDataV2<T>(
  url: string
): Promise<ApiListResponse<T>> {
  try {
    const response: AxiosResponse<{
      payload: T[];
    }> = await axiosAuth.get(url);

    const { payload } = response.data;

    return {
      data: payload,
    };
  } catch (error) {
    console.log("ERROR fetching data", error);
    return { data: [], pageCount: 10 };
  }
}
export async function fetchListDataV3<T>(
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
    }> = await axiosAuth.get(url, { params: searchParams });

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
    const response: AxiosResponse<{ payload: T }> = await axiosAuth.get(url);

    const { payload } = response.data;

    return { data: payload };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: null };
  }
}

export async function fetchSingleDataTOWALLET<T>(
  url: string
): Promise<ApiSingleResponse<T>> {
  try {
    const response = await axiosAuth.get(url);

    const { data } = response;

    return { data };
  } catch (error) {
    console.log("ERROR to fetching", error);
    return { data: null };
  }
}
