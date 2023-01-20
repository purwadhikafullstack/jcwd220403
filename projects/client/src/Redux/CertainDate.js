import { createSlice } from '@reduxjs/toolkit'

const CertainDate = createSlice({
  name: 'CertainDate',
  initialState: {
    isOpen: false,
    room : null
  },
  reducers: {
    openModalCertainDate: (state, action) => {
      state.isOpen = true
      state.room = action.payload
    },
    closeModalCertainDate: (state) => {
      state.isOpen = false
      state.room = null
    }
  }
})

export const { openModalCertainDate, closeModalCertainDate } = CertainDate.actions
export default CertainDate.reducer