import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./user";
import sidebarReducer from "./sidebar";
import cartSlice from "./cart";

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: sidebarReducer,
    cart: cartSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export * from "./cart";
export * from "./sidebar";
export * from "./user";
