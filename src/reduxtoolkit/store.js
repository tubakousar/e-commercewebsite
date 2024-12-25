import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./Slice";

export const store = configureStore({
  reducer: {
    productlists: productReducer,
  },
});
