import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import api from "../utils/api"
import { TIngredient, TIngredientsDataType, TAsyncThunkConfig } from "../types/types"


export const loadIngredients = createAsyncThunk<TIngredient[], void, TAsyncThunkConfig> (
    'ingredients/fetchIngredients',    
    async() => {
        const response = await api.getIngredients();       
        return response.data
    }
);

const initialState: TIngredientsDataType = {
    ingredients: null,
    loading: false,
    error: null
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers :{},
    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload;
                
            })
            .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
                state.loading = false;
                state.ingredients = action.payload;
            })
    }
})

export default ingredientsSlice.reducer
