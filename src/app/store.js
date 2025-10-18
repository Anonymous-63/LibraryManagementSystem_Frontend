import { configureStore } from "@reduxjs/toolkit";
import authReduces from "../features/auth/authSlice"

export const store = configureStore({
    reducer:{
        auth: authReduces,
    },
    devTools: import.meta.env.MODE !== "production",
})