import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

//^ reducers
import productReducer from "./slice/product-slice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const AppUseSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
