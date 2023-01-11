import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "buttons",
    initialState: {
        isSubmitClicked: false
    },
    reducers: {
        submitClicked: (state) => {
            state.isSubmitClicked = true
        },
        submitClickedToFalse: (state) => {
            state.isSubmitClicked = false
        }
    }
})

export const {submitClicked, submitClickedToFalse} = slice.actions
export default slice.reducer