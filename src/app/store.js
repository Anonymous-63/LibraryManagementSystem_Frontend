import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        auth: authReducer,
    },
    devTools: import.meta.env.MODE !== "production",
})