import { createSlice } from '@reduxjs/toolkit'

export const historyWebSocketStart = 'HISTORY_WS_CONNECTION_START'
export const historyWebSocketStop = 'HISTORY_WS_CONNECTION_STOP'

const initialState = {
    success: false,
    orders: [],
    socketConnectionStatus: null
  }
  
  export const historySlice = createSlice({
    name: 'historyData',
    initialState,
    reducers: {
      setHistoryOrders: (state, action) => {
        return {
          ...state,
          success: action.payload.success,
          orders: action.payload.orders,
        }
      },
      setHistorySocketConnectionStatus: (state, action) => {
        return {
          ...state,
          socketConnectionStatus: action.payload
        }
      },
    },
  })
  
  export const { setHistoryOrders, setHistorySocketConnectionStatus } = historySlice.actions
  
  export default historySlice.reducer