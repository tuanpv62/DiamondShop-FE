//product
export const PRODUCTS_URLS = {
  GET_PRODUCTS: "products",
  GET_PRODUCT_BY_ID: (id: string | number) => `products/${id}`,
};

//auction
export const AUCTION_URLS = {
  GET_AUCTIONS: "/auctions",
  GET_AUCTION_BY_ID: (id: string) => `/auctions/${id}`,
  GET_AUCTIONS_DEFAULT_PER_PAGE: "/auctions/list?page=1&per_page=8",
  GET_AUCTIONS_DEFAULT_STATUS: (status: string) =>
    `/auctions/list?page=1&per_page=8&status=${status}`,
  UPDATE_AUCTIONS: (id: string | number) => `/auctions/update-auction/${id}`,
  UPDATE_AUCTIONS_SET_WAITING: (id: string | number) =>
    `/auctions/set-waiting/${id}`,
  UPDATE_AUCTIONS_SET_APPROVE: (id: string | number) =>
    `/auctions/set-approve/${id}`,
  UPDATE_AUCTIONS_USER_DEAL: (id: string | number) =>
    `/auctions/user-deal/${id}`,
  UPDATE_AUCTIONS_SET_CONFIRM: (id: string | number) =>
    `/auctions/set-confirm/${id}`,
  CREATE_AUCTIONS: "/auctions/create",

  REGISTER_ATTEND_AUCTIONS: (auctionId: string) =>
    `/auctions/register-by-auctionId/${auctionId}`,
};

//feedback
export const FEEDBACK_URLS = {
  CREATE_FEEDBACK: "/feedbacks/create",
  GET_FEEDBACKS_AUCTIONS: (auctionId: string) =>
    `/feedbacks/list?auctionID=${auctionId}`,
};
