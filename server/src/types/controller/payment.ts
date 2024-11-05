export type PlaceOrderBody = {
  amount: number;
  currency: string;
  orderDate: string;
  products: { price: number; qty: number; id: number }[];
};
