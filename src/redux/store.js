import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice.js'
import deviceReducer from './features/deviceSlice.js'
import actionSlice from './features/actionSlice.js'
import sensorSlice from './features/sensorSlice.js'
import systemSlice from './features/systemSlice.js'
import deviceActionSlice from './features/deviceActionSlice.js'

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
    sensor: sensorSlice,
    action: actionSlice,
    deviceAction: deviceActionSlice,
    system: systemSlice,
  },
})
