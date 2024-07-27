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
  GET_PROFILES_DEFAULT_PER_PAGE: "/profile?page=1&per_page=5",
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
  UPDATE_AUCTIONS_SET_COMMING: (id: string | number) =>
    `/auctions/set-comming/${id}`,

  CREATE_AUCTIONS: "/auctions/create",

  REGISTER_ATTEND_AUCTIONS: (auctionId: string) =>
    `/auctions/${auctionId}/register`,
};

//feedback
export const FEEDBACK_URLS = {
  CREATE_FEEDBACK: "/feedbacks/create",
  GET_FEEDBACKS_AUCTIONS: (auctionId: string) =>
    `/feedbacks/list?auctionID=${auctionId}`,
};
export const PAYMENT_URLS = {
  UPDATE_PAYMENT_ORDER: "/payment/pay-order-with-wallet",
};
export const ORDER_URLS = {
  GET_ORDER_BY_USER_ID: "/order/get-order-by-userid",
  // UPDATE_PAYMENT_ORDER: "/order/get-order-by-userid",
};
