import { createSlice } from '@reduxjs/toolkit'

const DeleteProperty = createSlice({
  name: 'DeleteProperty',
  initialState: {
    isOpen: false,
    property: null
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true
      state.property = action.payload
    },
    closeModal: (state) => {
      state.isOpen = false
      state.property = null
    }
  }
})

export const { openModal, closeModal } = DeleteProperty.actions
export default DeleteProperty.reducer