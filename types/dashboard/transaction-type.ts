export type ITransaction = {
  transactionId: number;
  resource: string;
  amount: number;
  paymentMethod: string;
  status: string;
  content: string;
  transactionCode: string;
  failedReason: null;
};
