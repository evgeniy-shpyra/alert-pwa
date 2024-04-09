import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice.js'
import deviceReducer from './features/deviceSlice.js'
import actionSlice from './features/actionSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    action: actionSlice
  },
})
