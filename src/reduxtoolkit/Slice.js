import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "./Apis";
// get all products
export const getallproducts = createAsyncThunk(
  "productlists/getallproducts",
  async () => {
    const response = await api.apigetallproducts();
    return response.products;
  }
);

// get products by category
export const getproductsbycategory = createAsyncThunk(
  "productlists/getproductsbycategory",
  async (category) => {
    const response = await api.apigetproductbycategory(category);
    return response.products;
  }
);


export const productslice = createSlice({
  name: "productlists",
  initialState: {
    products: [],
    cart: JSON.parse(localStorage.getItem("products")) || [],
    loading: "idle",
    error: null,
  },
  reducers: {
    addtocart: (state, action) => {
      const existitem = state.cart.findIndex(
        (cartitem) => cartitem.id === action.payload.id
      );
      if (existitem >= 0) {
        state.cart[existitem].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("products" ,JSON.stringify(state.cart))
    },
    removefromcart: (state, action) => {
      const removecart = action.payload;

      state.cart = state.cart.filter((cartitem) => cartitem.id !== removecart);
      localStorage.setItem("products" ,JSON.stringify(state.cart))
    },
    updatequantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((cartitem) => cartitem.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("products" ,JSON.stringify(state.cart))
    },
    clearcart: (state) => {
      state.cart = [];
      localStorage.setItem("products" ,JSON.stringify(state.cart))
    },
  },
  extraReducers: (builder) => {
    builder
      // get all products
      .addCase(getallproducts.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getallproducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = "idle";
      })
      .addCase(getallproducts.rejected, (state, action) => {
        state.loading = action.error.message;
        state.loading = "idle";
      })

      // get product by category
      .addCase(getproductsbycategory.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(getproductsbycategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = "idle";
      })
      .addCase(getproductsbycategory.rejected, (state, action) => {
        state.products = action.payload;

        state.loading = "idle";
      });
  },
});
export const { addtocart, updatequantity, removefromcart, clearcart } =
  productslice.actions;
export default productslice.reducer;
