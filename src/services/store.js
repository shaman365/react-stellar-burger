import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients'
import modalSlice from './modal';
import burgerSlice from './burger'
import orderSlice from './order';

export const store = configureStore({
    reducer: {
        ingredientsData: ingredientsSlice,
        modalData: modalSlice,
        burgerData: burgerSlice,
        orderData: orderSlice
    }
});