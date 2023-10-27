import { createSlice } from '@reduxjs/toolkit'

export const feedWebSocketStart = 'FEED_WS_CONNECTION_START'
export const feedWebSocketStop = 'FEED_WS_CONNECTION_STOP'

const initialState = {
    success: false,
    orders: [],
    total: null,
    totalToday: null,
    socketConnectionStatus: null
  }
  
  export const feedSlice = createSlice({
    name: 'feedData',
    initialState,
    reducers: {
      setFeed: (state, action) => {
        return {
          ...state,
          success: action.payload.success,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        }
      },
      setFeedSocketConnectionStatus: (state, action) => {
        return {
          ...state,
          socketConnectionStatus: action.payload
        }
      },
    },
  })
  
  export const { setFeed, setFeedSocketConnectionStatus } = feedSlice.actions
  
  export default feedSlice.reducer