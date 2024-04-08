import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice.js'
import deviceReducer from './features/deviceSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
  },
})
