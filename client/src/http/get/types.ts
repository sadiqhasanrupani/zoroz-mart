export type GetUserRes = {
  message: string;
  userData: {
    id: number;
    name: string;
    image: string | null;
    email: string;
    address: string;
    phone: string;
  };
};

export type Product = {
  id: number;
  categoryId: number;
  categoryNm: string;
  name: string;
  price: string;
  description: string | null;
  prodImages: string[] | null;
};

export type Products = Product[];

export type GetProductsRes = {
  message: string;
  products: Products;
};

export type ProductDetail = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  images: string[] | null;
  categoryNm: string;
};

export type GetProductDetailRes = {
  productDetail: ProductDetail;
};

export type ProductCategory = {
  id: number;
  name: string;
};

export type GetProductCategoriesRes = {
  message: string;
  productCategories: ProductCategory[];
};

export type GetCartProdDetailRes = {
  message: string;
  cartData:
    | {
        id: number;
        quantity: number;
      }
    | undefined;
};

export type GetCartCountRes = {
  message: string;
  cartCount: number | undefined;
};

export type Cart = {
  id: number;
  prodId: number;
  prodName: string;
  prodImg: string[] | null;
  prodQty: number;
  prodPrice: string;
  isCheck: boolean | null;
  prodTotalPrice: string;
};

export type GetCartDataRes = {
  message: string;
  carts: Cart[];
};
