import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../utils/api'


export const loadIngredients = createAsyncThunk('ingredients/fetchIngredients', async (thunkAPI) => {
    try {
        const response = await api.getIngredients()
        return response.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
});

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        ingredients: [],
        loading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadIngredients.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loadIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingredients = action.payload;
            })
    }
})

export default ingredientsSlice.reducer
