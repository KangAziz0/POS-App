import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/CategorySlice.js"

export const store = configureStore({
    reducer:{
        category: categoryReducer
    }
})