import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import type { TBurgerData, TIngredient, TSortIngredientsPayload } from '../types/types'


const initialState: TBurgerData = {
    bun: [],
    ingredients: []
};

const burgerSlice = createSlice({
    name: 'burgerData',
    initialState,
    reducers: {
        addIngredient: {
            reducer: (state, action: PayloadAction<TIngredient>) => {
                return {
                    ...state,
                    ingredients: [
                        ...state.ingredients,
                        action.payload
                    ]
                }
            }, prepare: (item: TIngredient) => {
                return {
                    payload: {
                        ...item,
                        key: nanoid()
                    }
                }
            }
        },

        deleteIngredient: (state, action: PayloadAction<TIngredient>) => {
            return {
                ...state,
                ingredients: state.ingredients.filter(item => item.key !== action.payload.key),
            }
        },

        addBun: {
            reducer: (state, action: PayloadAction<TIngredient>) => {
                return !state.bun.length ? {
                    ...state,
                    bun: [
                        action.payload
                    ]
                } : '_id' in state.bun && state.bun._id === action.payload._id ? {
                    ...state
                } : {
                    ...state,
                    bun: [
                        action.payload
                    ]
                }
            }, prepare: (item: TIngredient) => {
                return {
                    payload: {
                        ...item,
                        key: nanoid()
                    }
                }
            }
        },
        sortIngredients: (state, action: PayloadAction<TSortIngredientsPayload>) => {
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
        clearIngredients: (state, action: PayloadAction<{}>) => {
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