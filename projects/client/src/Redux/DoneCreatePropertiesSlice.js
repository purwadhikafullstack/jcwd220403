import { createSlice } from "@reduxjs/toolkit"

const doneCreateData = createSlice({
    name:"doneCreateData",
    initialState: {
        isDone : false
    },
    reducers: {
        isDoneCreate: (state) => {
            state.isDone = true
        },
        isDeleteData: (state) => {
            state.isDone = false
        }
    }
})

export const {isDoneCreate, isDeleteData} = doneCreateData.actions
export default doneCreateData.reducer