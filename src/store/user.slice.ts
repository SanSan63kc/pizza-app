import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    jwt: string | null
}

let initialState: UserState = {
    jwt: null
}

export let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
        },
        logout: (state) => {
            state.jwt = null
        }
    }
})

export default userSlice.reducer
export let userActions = userSlice.actions