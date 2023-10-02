import { createSlice } from "@reduxjs/toolkit";

enum UserRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

enum UserStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED",
    TEMPORARY_BAN = "TEMPORARY_BAN"
}

export interface User {
    id: string;
    avatar: string;
    email: string;
    emailAuthentication: boolean;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    createAt: String;
    updateAt: String;
}

const initialState: null | User = null;

const boxChatSlice = createSlice({
    name: "boxchat",
    initialState,
    reducers: {
        setData: function(state, action) {
            return action.payload
        }
    }
})

export const userAction = {
    ...boxChatSlice.actions
}

export const boxChatReducer = boxChatSlice.reducer