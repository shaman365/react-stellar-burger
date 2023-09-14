import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients'
import modalSlice from './modal';

export const store = configureStore({
    reducer: {
        ingredientsData: ingredientsSlice,
        modalData: modalSlice
    }
});