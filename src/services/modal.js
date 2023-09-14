import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modalData",
    initialState: {
        active: false,
        type: '',
        ingredient: ''
    },
    reducers: {
        openModalIngredient: (state, action) => {
            console.log('action.payload:', action.payload);

            return {
                ...state,
                active: true,
                type: 'ingredient',
                ingredient: action.payload
            }
        },
        openModalOrder: (state, action) => {
            return {
                ...state,
                active: true,
                type: 'order'
            }
        },
        closeModalIngredient: (state, action) => {
            return {
                ...state,
                active: false,
                ingredient: ''
            }
        },
        closeModal: (state, action) => {
            return {
                ...state,
                active: false,
                ingredient: ''
            }
        }
    }
})

export const { openModalIngredient, openModalOrder, closeModalIngredient, closeModal } = modalSlice.actions;

export default modalSlice.reducer;  // export default