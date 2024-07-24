export type IOrder = {
  orderId: number;
  status: number;
  paymentMethod: string;
  total: number;
  phone: number;
  address: string;
  auctionTitle: string;
  expiredAt: Date;
  productName: string;
  productCode: string;
  auctionName: string;
  auctionCode: string;
  quantity: number;
  note: string;
  auctionID: number;
  userID: number;
  created_at: Date;
  updated_at: Date;
  confirmed: boolean;
};
  