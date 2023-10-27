import { configureStore } from '@reduxjs/toolkit'
import ingredientsSlice from './ingredients'
import modalSlice from './modal';
import burgerSlice from './burger'
import orderSlice from './order';
import userSlice from './user';
import socketMiddleware from '../services/socketMiddleware'; 
import feedSlice from './feed'
import { setFeedSocketConnectionStatus, setFeed, feedWebSocketStart, feedWebSocketStop } from './feed'

export const store = configureStore({
    reducer: {
        ingredientsData: ingredientsSlice,
        modalData: modalSlice,
        burgerData: burgerSlice,
        orderData: orderSlice,
        user: userSlice,
        feedData: feedSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
        socketMiddleware({
            wsStart: feedWebSocketStart,
            wsStop: feedWebSocketStop,
            wsOpen: setFeedSocketConnectionStatus,
            wsMessage: setFeed,
            wsClose: setFeedSocketConnectionStatus,
            wsError: setFeedSocketConnectionStatus,     
        })
    )
});