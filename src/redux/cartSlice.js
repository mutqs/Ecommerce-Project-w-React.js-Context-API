import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      if (state.cart.length > 0) {
        let isInclude = false;
        state.cart.forEach(function (x) {
          if (x.id == action.payload.tempProduct.id) {
            x.count += action.payload.cartCount;
            isInclude = true;
            return;
          }
        });
        if (!isInclude) {
          action.payload.tempProduct.count += action.payload.cartCount;
          state.cart.push(action.payload.tempProduct);
        }
        return;
      }
      action.payload.tempProduct.count += action.payload.cartCount;
      state.cart.push(action.payload.tempProduct);
    },
    deleteProductFromCart: (state, action) => {
      state.cart = state.cart.filter((x) => x.id != action.payload.id);
    },
  },
});

export const { addProductToCart, deleteProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;
