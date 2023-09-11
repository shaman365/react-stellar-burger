import React, { createContext, useReducer } from "react";

export const BurgerContext = React.createContext(null);
export const OrderContext = React.createContext(null);

export const BurgerDispatchContext = createContext(null);
export const OrderDispatchContext = createContext(null)

const initialBurgerState = {
    bun: null,
    ingredients: []
};

const initialOrderState = {
    name: "",
    order: {
        number: null
    },
    success: false
};

export function BurgerConstructorProvider({ children }) {

    const [orderData, orderDataDispatch] = useReducer(
        orderDataReducer,
        initialOrderState
    );

    const [burgerData, burgerDataDispatch] = useReducer(
        burgerDataReducer,
        initialBurgerState
    );

    return (
        <BurgerContext.Provider value={burgerData}>
            <BurgerDispatchContext.Provider value={burgerDataDispatch}>
                <OrderContext.Provider value={orderData}>
                    <OrderDispatchContext.Provider value={orderDataDispatch}>
                        {children}
                    </OrderDispatchContext.Provider>
                </OrderContext.Provider>
            </BurgerDispatchContext.Provider>
        </BurgerContext.Provider>
    )
}

const burgerDataReducer = (burgerData, action) => {
    switch (action.type) {
        case 'addIngredient': {
            return {
                ...burgerData,
                ingredients: [
                    ...burgerData.ingredients,
                    action.payload
                ]
            };
        }
        case 'addBun': {
            if (!burgerData.bun) {
                return {
                    ...burgerData,
                    bun: action.payload
                };
            }
            else {
                if (burgerData.bun._id === action.payload._id) {
                    return {
                        ...burgerData
                    };
                }
                else {
                    return {
                        ...burgerData,
                        bun: action.payload
                    };
                }
            }
        }
        case 'deleteIngredient': {
            return {
                ...burgerData,
                ingredients: burgerData.ingredients.filter(item => item._id !== action.id),
            }
        }
        case 'clearIngredients': {
            return {
                ingredients: []
            }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const orderDataReducer = (orderData, action) => {
    switch (action.type) {
        case 'addOrder': {
            return {
                name: action.payload.name,
                order: {
                    number: action.payload.order.number
                },
                success: action.payload.success
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}