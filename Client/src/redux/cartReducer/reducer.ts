import { AnyAction, Dispatch,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userCart from "@/apis/userCart";
/*                                                                                                                                            */ 

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    temp:""
  },
  reducers: {
    getcart: (state, {payload}) => {
        state.cartItems=payload
    },

  },
});

  export const getcart1:any =(token:any,dispatch: Dispatch<AnyAction>) => {
    async function  getcart2() {
      try {
        const res = await userCart.getCart(token);
        dispatch(getcart(res.data));
      } catch (error) {
      }
    };
    getcart2();
  }
export const { 
getcart } =
cartSlice.actions;

export default cartSlice.reducer;
