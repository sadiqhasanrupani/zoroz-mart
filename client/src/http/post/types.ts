export type LoginContext = {
  email: string;
  password: string;
};

export type AddToCartContext = {
  productId: number;
  qty: number;
};

export type Product = { price: number; qty: number; id: number };

export type PlaceOrderContext = {
  amount: number;
  currency: string;
  orderDate: Date;
  products: Product[];
};
