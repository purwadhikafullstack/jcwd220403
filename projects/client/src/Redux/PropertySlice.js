import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: {
        name: ""
    }
}

const propertySlice = createSlice({
    name: "property",
    initialState,
    reducers: {
        getName: (state, action) => {
            state.value.name = action.payload
        }
    }
})

export const { getName } = propertySlice.actions
export default propertySlice.reducer