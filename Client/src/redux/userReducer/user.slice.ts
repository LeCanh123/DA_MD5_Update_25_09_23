import { createSlice } from "@reduxjs/toolkit";

// enum UserRole {
//     OWNER = "OWNER",
//     ADMIN = "ADMIN",
//     MEMBER = "MEMBER",
// }

// enum UserStatus {
//     ACTIVE = "ACTIVE",
//     BANNED = "BANNED",
//     TEMPORARY_BAN = "TEMPORARY_BAN"
// }

// export interface User {
//     id: string;
//     avatar: string;
//     email: string;
//     emailAuthentication: boolean;
//     firstName: string;
//     lastName: string;
//     userName: string;
//     password: string;
//     role: UserRole;
//     status: UserStatus;
//     createAt: String;
//     updateAt: String;
// }

const initialState:any = null;

const userSlice = createSlice({
    name: "user",
    initialState:{
        id:"",
        socketClient:"",

        //cash
        data: null,
        socket:"",
        receipts: null,
        cart: null,
        cartPayQr: null,
        reLoad: false,

    },
    reducers: {
        setData: function(state, action) {
           
            
          state.id= action.payload.id
        },

        setSocketClient: function(state, action) {
          state.socketClient= action.payload.connectSocket
        },
        //cash
        setSocket: function (state, action) {
              state.socket= action.payload
        },
        setCashData: function(state, action) {
              state.data= action.payload
        },
        setReceipt: function (state, action) {
              state.receipts= action.payload
        },
        setCart: function (state, action) {
              state.cart= action.payload
        },
        setCartPayQr: function (state, action) {
              state.cartPayQr= action.payload
        },
        reload: function (state) {
              state.reLoad= !state.reLoad
        }

    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer