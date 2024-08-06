import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";

export let store = configureStore({
    reducer:{
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch