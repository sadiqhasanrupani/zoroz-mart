import { createSlice } from "@reduxjs/toolkit";

export type ProductState = {
  prodCategoryId: number | null | undefined;
  cartCount: number;
  productSubTotalPrice: number;
};

const initialState: ProductState = {
  prodCategoryId: null,
  cartCount: 0,
  productSubTotalPrice: 0,
};

const productSlice = createSlice({
  name: "product-slice",
  initialState,
  reducers: {
    addProdCategoryId: (state, { payload }: { payload: number | undefined }) => {
      state.prodCategoryId = payload;
    },

    addToCart: (state, { payload }: { payload: number }) => {
      state.cartCount = payload;
    },

    addProdSubTotalHandler: (state, { payload }: { payload: number }) => {
      const totalPrice = payload;

      state.productSubTotalPrice = parseFloat(totalPrice.toFixed(2));
    },
  },
});

const productReducer = productSlice.reducer;

export const productActions = productSlice.actions;

export default productReducer;
