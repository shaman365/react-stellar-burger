import { configureStore, combineReducers } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients'
import modalSlice from './modal';
import burgerSlice from './burger'
import orderSlice from './order';
import userSlice from './user';
import socketMiddleware from './socketMiddleware';
import feedSlice from './feed'
import historySlice from './history'
import { setFeedSocketConnectionStatus, setFeed, feedWebSocketStart, feedWebSocketStop } from './feed'
import { setHistorySocketConnectionStatus, setHistoryOrders, historyWebSocketStart, historyWebSocketStop } from './history'

const rootReducer = combineReducers({
    ingredientsData: ingredientsSlice,
    modalData: modalSlice,
    burgerData: burgerSlice,
    orderData: orderSlice,
    user: userSlice,
    feedData: feedSlice,
    historyData: historySlice
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
        .concat(
            socketMiddleware({
                wsStart: feedWebSocketStart,
                wsStop: feedWebSocketStop,
                wsOpen: setFeedSocketConnectionStatus,
                wsMessage: setFeed,
                wsClose: setFeedSocketConnectionStatus,
                wsError: setFeedSocketConnectionStatus,
            }),

            socketMiddleware({
                wsStart: historyWebSocketStart,
                wsStop: historyWebSocketStop,
                wsOpen: setHistorySocketConnectionStatus,
                wsMessage: setHistoryOrders,
                wsClose: setHistorySocketConnectionStatus,
                wsError: setHistorySocketConnectionStatus,
            })
        )
});