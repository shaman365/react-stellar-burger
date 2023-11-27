import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TWSData, TWSPayload } from '../types/types'

export const feedWebSocketStart = 'FEED_WS_CONNECTION_START'
export const feedWebSocketStop = 'FEED_WS_CONNECTION_STOP'

const initialState: TWSData = {
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
      setFeed: (state, action: PayloadAction<TWSPayload>) => {
        return {
          ...state,
          success: action.payload.success,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        }
      },
      setFeedSocketConnectionStatus: (state, action: PayloadAction<string>) => {
        return {
          ...state,
          socketConnectionStatus: action.payload
        }
      },
    },
  })
  
  export const { setFeed, setFeedSocketConnectionStatus } = feedSlice.actions
  
  export default feedSlice.reducer