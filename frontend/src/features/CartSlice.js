import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCart = createAsyncThunk("cart/getCart", async () => {
  const response = await axios.get("/carts");
  return response.data;
});

export const addCart = createAsyncThunk("cart/addCart", async (data) => {
  await axios.post("/carts", data);
  const response = await axios.get("/carts");
  return response.data;
});

export const updateCart = createAsyncThunk("cart/updateCart", async (data) => {
  await axios.put(`/carts/${data.id}`, data);
  const response = await axios.get("/carts");
  return response.data;
});

export const delCart = createAsyncThunk("cart/deleteCart",async (data) => {
  await axios.delete(`/carts/${data}`)
  const response = await axios.get("/carts");
  return response.data;
})

export const saveCart = createAsyncThunk("cart/saveCart", async (data) => {
  await axios.post("/orders", data);
  axios.get("/carts").then((cart)=>{
    const data = cart.data
    data.map(async (item) =>{
      try{
        await axios.delete(`/carts/${item.id}`)
      }catch(error){
        console.log(error);
        return null
      }
    })
  })
  const response = await axios.get("/carts");
  return response.data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.data = null;
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.data = null;
        state.loading = false;
      })
      // AddCart
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(addCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      // UPDATE CART
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      // DELETE CART
      .addCase(delCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(delCart.fulfilled, (state,action) => {
        state.data = action.payload
        state.loading = false;
        state.error = null;
      })
      .addCase(delCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // SAVE ORDER
      .addCase(saveCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(saveCart.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(saveCart.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.data = null;
      })
      ;
  },
});

export default cartSlice.reducer;
