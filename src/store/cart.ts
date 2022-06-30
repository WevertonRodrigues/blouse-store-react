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
    setProductQuantity(
      state,
      {
        payload: { product, quantity },
      }: PayloadAction<{ quantity: number; product: ProductCart }>
    ) {
      const index = state.cart.products.findIndex(
        (item) => item.id === product.id
      );

      state.cart.products.splice(index, 1, { ...product, quantity });
    },
  },
});

export const { addToCart, removeFromCart, setProductQuantity } =
  cartSlice.actions;

export const selectCartProducts = (state: RootState) =>
  state.cart.cart.products;

export const productIsSelected = (state: RootState, productId: number) =>
  state.cart.cart.products.map((item) => item.id).includes(productId);

export const totalCart = (state: RootState) =>
  state.cart.cart.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

export default cartSlice.reducer;
