import { createSlice } from "@reduxjs/toolkit"

const initialState: { count: number } = {
    count: 0
}

const slice = createSlice({
    initialState,
    name: "lifeCountState",
    reducers: {
        setCount: (state, data) => {
            state.count = data.payload as number;
        }
    }
})

export const lifeCountActions = slice.actions
export const lifeCountReducer = slice.reducer