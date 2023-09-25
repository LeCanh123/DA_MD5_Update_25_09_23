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

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setData: function(state, action) {
            return action.payload
        }
    }
})

export const userAction = {
    ...userSlice.actions
}

export const userReducer = userSlice.reducer