import { createSlice } from "@reduxjs/toolkit"
import config from "../../config/game-config.json"

function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / config.field.height - 2
}

const initialState: { cellSize: number } = {
    cellSize: getSize()
}

const slice = createSlice({
    initialState,
    name: "cellSizeState",
    reducers: {
        setSize: (state) => {
            state.cellSize = getSize();
        }
    }
})

export const cellSizeActions = slice.actions
export const cellSizeReducer = slice.reducer