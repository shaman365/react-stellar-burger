import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

const burgerSlice = createSlice({
    name: 'burgerData',
    initialState: {
        bun: [],
        ingredients: []
    },
    reducers: {
        addIngredient: {
            reducer: (state, action) => {
                return {
                    ...state,
                    ingredients: [
                        ...state.ingredients,
                        action.payload
                    ]
                }
            }, prepare: (item) => {
                return {
                    payload: {
                        ...item,
                        key: nanoid()
                    }
                }
            }
        },

        deleteIngredient: (state, action) => {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.key !== action.payload.key),
            }
        },

        addBun: {
            reducer: (state, action) => {
                return !state.bun.length ? {
                    ...state,
                    bun: [
                        action.payload
                    ]
                } : state.bun._id === action.payload._id ? {
                    ...state
                } : {
                    ...state,
                    bun: [
                        action.payload
                    ]
                }
            }, prepare: (item) => {
                return {
                    payload: {
                        ...item,
                        key: nanoid()
                    }
                }
            }
        },
        sortIngredients: (state, action) => {
            const ingredients = [...state.ingredients]
            ingredients.splice(
                action.payload.dropIndex,
                0,
                ingredients.splice(action.payload.dragIndex, 1)[0]
            )
            return {
                ...state,
                ingredients: ingredients,
            }
        },
        clearIngredients: (state, action) => {
            return {
                ...state,
                ingredients: [],
                bun: []
            }
        }
    }
});


export const { addIngredient, addBun, deleteIngredient, sortIngredients, clearIngredients } = burgerSlice.actions
export default burgerSlice.reducer