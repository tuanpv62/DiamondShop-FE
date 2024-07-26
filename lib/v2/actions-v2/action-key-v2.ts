//product
export const PRODUCTS_URLS_V2 = {
  GET_PRODUCTS: "products",
  GET_PRODUCT_BY_ID: (id: string | number) => `products/${id}`,
};

//auction
export const AUCTION_URLS_V2 = {
  GET_AUCTIONS: "/auctions",
  GET_TRANSACTIONS: "/transaction/get-all",
  GET_ORDERS: "/order/get-all",

  GET_AUCTIONS_WITH_STATUS: (status: string) => `/auctions?Status=${status}`,
  GET_AUCTION_BY_USERID: (id: string) => `/auctions?CreateByUserId=${id}`,

  GET_AUCTION: "/auction",
  GET_AUCTION_BY_ID: (id: string) => `/auctions/${id}`,
  GET_AUCTIONS_DEFAULT_PER_PAGE: "/auction/list?page=1&per_page=8",
  GET_AUCTIONS_DEFAULT_STATUS: (status: string) =>
    `/auction/list?page=1&per_page=8&status=${status}`,

  UPDATE_AUCTIONS: (id: string | number) => `/auction/update-auction/${id}`,
  UPDATE_AUCTIONS_EVALUATE: (id: string | number) =>
    `/auctions/set-evaluate/${id}`,
  UPDATE_AUCTIONS_SET_WAITING: (id: string | number) =>
    `/auctions/set-waiting/${id}`,
  CREATE_AUCTIONS: "/auction",
  REGISTER_ATTEND_AUCTIONS: (auctionId: string) =>
    `/auction/register-by-auctionId/${auctionId}`,
};

//feedback
export const FEEDBACK_URLS_V2 = {
  CREATE_FEEDBACK: "/feedbacks/create",
  GET_FEEDBACKS_AUCTIONS: (auctionId: string) =>
    `/feedbacks/list?auctionID=${auctionId}`,
};
