export type IBidList = {
  bidId: number;
  ratings: number;
  biddingPrice: number;
  isTop1: boolean;
  userID: number;
  auctionID: number;
  userName: string;
};

export type IAuction = {
  auctionId: number;
  productID: number;
  productName: string;
  productCode: string;
  startPrice: number;
  endPrice: number;
  status: string;
  depositPrice: number;
  description: string;
  // product: IProduct;
  paymentMethod: string;
  title: string;
  bidList: IBidList[];
  biddingPrice?: number;
  image_url: string;
  quantity: number;
  modifiedBy: string;
  created_at: Date;
  updated_at: Date;
  remindAt: Date;
  endDate?: Date;
  startDate?: Date;
  rejected: boolean;
  approved: boolean;
};

export type IAuctionV2 = {
  auctionId: number;
  productID: number;
  productName: string;
  productCode: string;
  startPrice: number;
  endPrice: number;
  status: string;
  depositPrice: number;
  description: string;
  // product: IProduct;
  paymentMethod: string;
  title: string;
  bidList: IBidList[];
  biddingPrice?: number;
  image_url: string;
  quantity: number;
  modifiedBy: string;
  created_at: Date;
  updated_at: Date;
  remindAt: Date;
  endDate?: Date;
  startDate?: Date;
  rejected: boolean;
  approved: boolean;
};
export type IAuctionCreateField = {
  quantity: number;
  depositPrice: number;
  startPrice: number;
  title: string;
  productID: number;
  startDate?: string;
  endDate?: string;
  remindAt?: string;
  image_url: string;
};

export type IFeedBack = {
  id: number;
  content: string;
  auctionID: number;
  img?: string;
  name: string;
  userID: number;
};

export enum AuctionStatus {
  LIVE = "LIVE",
  COMING = "COMING",
  END = "END",
}
