import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartItem {
    id: number,
    count: number
}

export interface CartState {
    items: CartItem[];
}

let initialState: CartState = {
    items: []
}

export let cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
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