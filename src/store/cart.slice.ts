import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { loadState } from "./storage";

export let CART_PERSISTANT_STATE = "cartData"

export interface CartItem {
    id: number,
    count: number
}

export interface CartState {
    items: CartItem[];
}

let initialState: CartState = loadState<CartState>(CART_PERSISTANT_STATE) ?? {
    items: []
}

export let cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload)
        },
        remove: (state, action: PayloadAction<number>) => {
            let existed = state.items.find(i => i.id === action.payload)
            if (!existed) {
                return
            }
            if (existed.count === 1) {
                state.items = state.items.filter(i => i.id !== action.payload)
            } else {
                state.items.map(i => {
                    if (i.id === action.payload) {
                        i.count -= 1
                    }
                    return i
                })
                return
            }
        },
        add: (state, action: PayloadAction<number>) => {
            let exixted = state.items.find(i => i.id === action.payload)
            if (!exixted) {
                state.items.push({ id: action.payload, count: 1 })
                return
            }
            state.items.map(i => {
                if (i.id === action.payload) {
                    i.count += 1
                }
                return i
            })
        }
    }
})

export default cartSlice.reducer
export let cartActions = cartSlice.actions