import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { LoginResponse } from "../interfaces/auth.interface";
import { PREFIX } from "../helpers/API";
import { Profile } from "../interfaces/user.interface";
import { RootState } from "./store";

export let JWT_PERSISTANT_STATE = "userData"

export interface UserPersistantState {
    jwt: string | null
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage?: string,
    registerErrorMessage?: string,
    profile?: Profile
}

let initialState: UserState = {
    jwt: loadState<UserPersistantState>(JWT_PERSISTANT_STATE)?.jwt ?? null,
}

export let login = createAsyncThunk("user/login",
    async (params: { email: string, password: string }) => {
        try {
            let { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                email: params.email,
                password: params.password
            })
            return data
        } catch (e) {
            if (e instanceof AxiosError){
                throw new Error(e.response?.data.message)
            }
        }

    }
)

export let register = createAsyncThunk("user/register",
    async (params: { email: string, password: string, name: string }) => {
        try {
            let { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name
            })
            return data
        } catch (e) {
            if (e instanceof AxiosError){
                throw new Error(e.response?.data.message)
            }
        }

    }
)

export let getProfile = createAsyncThunk<Profile, void, {state: RootState}>("user/getProfile",
    async (_, thunkApi) => {
        let jwt = thunkApi.getState().user.jwt
        let { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        return data
    }
)

export let userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.jwt = null
        },
        clearLoginError: (state) => {
            state.loginErrorMessage = undefined
        },
        clearRegisterError: (state) => {
            state.registerErrorMessage = undefined
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            if (!action.payload){
                return 
            }
            state.jwt = action.payload.access_token
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message
        })
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.profile = action.payload
        })

        builder.addCase(register.fulfilled, (state, action) => {
            if (!action.payload){
                return 
            }
            state.jwt = action.payload.access_token
        })
        builder.addCase(register.rejected, (state, action) => {
            state.registerErrorMessage = action.error.message
        })
    }
})

export default userSlice.reducer
export let userActions = userSlice.actions