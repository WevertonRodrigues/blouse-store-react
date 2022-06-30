import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Cart, ProductCart } from "../services";

interface ICartState {
  cart: Cart;
}

const initialState: ICartState = {
  cart: {
    owner: -1,
    products: [],
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductCart>) {
      state.cart.products.push(action.payload);
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const index = state.cart.products.findIndex(
        (product) => action.payload === product.id
      );

      state.cart.products.splice(index, 1);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const selectCartProducts = (state: RootState) =>
  state.cart.cart.products;

export const productIsSelected = (state: RootState, productId: number) =>
  state.cart.cart.products.map((item) => item.id).includes(productId);

export default cartSlice.reducer;
