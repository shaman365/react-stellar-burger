import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'
import { TOrder, TOrderData, TIngredient, TAsyncThunkConfig } from '../types/types';

const initialState: TOrderData = {
    name: "",
    order: {
        number: null
    },
    success: false,
    status: ""
};

const getingredientIdList = (array: TIngredient[]) : string[] => {
    return array.reduce((total:string[], item: TIngredient) => {       
        return [...total, item._id];
    }, []);
};

export const getOrderData = createAsyncThunk<TOrderData, TIngredient[], TAsyncThunkConfig> (
    'order/setOrder',
    async (ingredients) => {
        const ingredientIdList = getingredientIdList(ingredients)
        const orderData = await api.setOrder(ingredientIdList);

        return orderData
    }
)

export const orderSlice = createSlice({
    name: 'orderData',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrderData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getOrderData.fulfilled, (state, action) => {
                return {
                    name: action.payload.name,
                    order: {
                        number: action.payload.order.number
                    },
                    success: action.payload.success,
                    status: 'fulfilled'
                }
            })
            .addCase(getOrderData.rejected, (state) => {
                return {
                    name: "",
                    order: {
                        number: null
                    },
                    success: false,
                    status: 'reject'
                }
            })
    }
})

export default orderSlice.reducer