"use server";

import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { IAuction, IAuctionCreateField, IFeedBack } from "@/types/dashboard";
import { SearchParams } from "@/types/table";
import {
  ApiListResponse,
  ApiSingleResponse,
  fetchListData,
  fetchSingleData,
} from "@/lib/generics";

import axios from "axios";
import { axiosAuth } from "@/lib/api-interceptor/api";
import { AUCTION_URLS, FEEDBACK_URLS } from "./action-key";

export async function getAuctions(): Promise<ApiListResponse<IAuction>> {
  noStore();

  // 8 auction default
  return await fetchListData(AUCTION_URLS.GET_AUCTIONS_DEFAULT_PER_PAGE);
}

export async function getAuctionsWithStatus(
  status: string
): Promise<ApiListResponse<IAuction>> {
  noStore();

  return await fetchListData(AUCTION_URLS.GET_AUCTIONS_DEFAULT_STATUS(status));
}

export async function getAuctionByID(
  params: string
): Promise<ApiSingleResponse<IAuction>> {
  noStore();

  return await fetchSingleData(AUCTION_URLS.GET_AUCTION_BY_ID(params));
}

export async function getTableAuctions(
  searchParams: SearchParams
): Promise<ApiListResponse<IAuction>> {
  noStore();

  return await fetchListData(AUCTION_URLS.GET_AUCTIONS, searchParams);
}

interface AuctionStatusUpdate {
  id: number;
  status: string;
}
export async function updateStatusAuction({ id, status }: AuctionStatusUpdate) {
  try {
    const res = await axiosAuth.put(AUCTION_URLS.UPDATE_AUCTIONS(id), {
      status,
    });

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI");
  }
}
export async function updateStatusAcceptAuction({ id, approved }: any) {
  try {
    const res = await axiosAuth.put(AUCTION_URLS.UPDATE_AUCTIONS(id), {
      approved: approved,
    });

    console.log(res);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to updateStatusAcceptAuction");
  }
}
export async function updateStatusRejectAuction({
  id,
  rejected,
  reasonReject,
}: any) {
  try {
    // const reasonReject = "Buổi đấu giá ko đạt yêu cầu"

    const res = await axiosAuth.put(AUCTION_URLS.UPDATE_AUCTIONS(id), {
      rejected: rejected,
      reasonReject: reasonReject,
    });

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to updateStatusRejectAuction");
  }
}

export async function updateEvaluate({ id, values }: any) {
  try {
    console.log("vinh", values);
    const res = await axiosAuth.put(
      AUCTION_URLS.UPDATE_AUCTIONS_SET_WAITING(id),
      {
        values,
      }
    );

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to dinh gia");
  }
}
export async function updateReEvaluate({ id, values }: any) {
  try {
    console.log("tuan", values);
    const res = await axiosAuth.put(
      AUCTION_URLS.UPDATE_AUCTIONS_USER_DEAL(id),
      {
        values,
      }
    );

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to dinh gia");
  }
}

export async function deleteAuction(params: string) {
  try {
    await axiosAuth.delete(AUCTION_URLS.GET_AUCTION_BY_ID(params));

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("Fail to delete: ", error);
  }
}

export async function setApproveAuction({ id, values }: any) {
  // t thấy m ko có values pass qua check đi  ????
  console.log(values);
  try {
    const res = await axiosAuth.put(
      AUCTION_URLS.UPDATE_AUCTIONS_SET_APPROVE(id),
      {
        responsibleBy: values,
      }
    );

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log("FALI to dinh gia");
  }
}
export async function setConfirmAuction({ id, title, startDate }: any) {
  console.log("kiki", id);

  try {
    const res = await axiosAuth.put(
      AUCTION_URLS.UPDATE_AUCTIONS_SET_CONFIRM(id),
      {
        startDate: startDate,
        title: title,
      }
    );
    if (res.status === 200 && res.data.isError === false) {
      console.log("Auction confirmed successfully:", res.data.message);
      revalidatePath("/dashboard/confirm");
      return res.data;
    } else {
      throw new Error(res.data.message || "Unexpected response from server");
    }

    // revalidatePath("/dashboard/confirm");
  } catch (error) {
    console.log("FAIL to xac nhan");

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

export async function updateAuctionDetail(
  params: string,
  data: IAuctionCreateField
): Promise<void> {
  noStore();

  try {
    await axiosAuth.put(AUCTION_URLS.UPDATE_AUCTIONS(params), data);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createAuction(data: IAuctionCreateField): Promise<void> {
  noStore();

  try {
    await axiosAuth.post(AUCTION_URLS.CREATE_AUCTIONS, data);

    revalidatePath("/dashboard/auctions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function registerAttendAuction(userId: string, auctionId: string) {
  try {
    const res = await axiosAuth.post(
      AUCTION_URLS.REGISTER_ATTEND_AUCTIONS(auctionId),
      userId
    );

    if (res.status === 200) {
      console.log("Registration successful");
      revalidatePath(`/auction/${auctionId}`);
      return { success: true, successFull: "Đăng kí đấu giá thành công" };
    } else {
      const errorMessage = res.data.error.errorMessage;
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const { response } = error;

      if (response && response.status === 406) {
        console.error("Insufficient balance in wallet.");
        return {
          success: false,
          error: "Không đủ xèng trong ví vui lòng nạp tiền nhé",
        };
      } else if (response && response.status === 400) {
        console.error(
          "Auction status is not COMING and user has already registered."
        );
        return { success: false, error: "Buổi đấu giá chưa diễn ra!" };
      } else {
        console.error("An unexpected error occurred:", error.message);
        return { success: false, error: "An unexpected error occurred" };
      }
    } else {
      console.error("An unexpected error occurred:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  }
}

export async function feedbackAuctionLive(
  userId: string,
  auctionId: string,
  content: string
) {
  const values = { userID: userId, auctionID: auctionId, content: content };
  console.log(values);
  try {
    const res = await axiosAuth.post(FEEDBACK_URLS.CREATE_FEEDBACK, values);

    if (res.status === 200) {
      console.log("feedback successful");
      revalidatePath(`/auction/${auctionId}`);
      return { success: true, successFull: "Gửi đấu feedback thành công" };
    } else {
      const errorMessage = res.data.error.errorMessage;
      return { success: false, error: errorMessage };
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getFeedBackAuction(
  params: string
): Promise<{ data: IFeedBack[] }> {
  return await fetchListData(FEEDBACK_URLS.GET_FEEDBACKS_AUCTIONS(params));
}
