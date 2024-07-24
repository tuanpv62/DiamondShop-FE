//product
export const PRODUCTS_URLS_V2 = {
  GET_PRODUCTS: "products",
  GET_PRODUCT_BY_ID: (id: string | number) => `products/${id}`,
};

//auction
export const AUCTION_URLS_V2 = {
  GET_AUCTIONS: "/auctions",
  GET_AUCTION_BY_ID: (id: string) => `/auctions/${id}`,
  GET_AUCTIONS_DEFAULT_PER_PAGE: "/auction/list?page=1&per_page=8",
  GET_AUCTIONS_DEFAULT_STATUS: (status: string) =>
    `/auction/list?page=1&per_page=8&status=${status}`,
  UPDATE_AUCTIONS: (id: string | number) => `/auction/update-auction/${id}`,
  CREATE_AUCTIONS: "/auctions/create",
  REGISTER_ATTEND_AUCTIONS: (auctionId: string) =>
    `/auction/register-by-auctionId/${auctionId}`,
};

//feedback
export const FEEDBACK_URLS_V2 = {
  CREATE_FEEDBACK: "/feedbacks/create",
  GET_FEEDBACKS_AUCTIONS: (auctionId: string) =>
    `/feedbacks/list?auctionID=${auctionId}`,
};
