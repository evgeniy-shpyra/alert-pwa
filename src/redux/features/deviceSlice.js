import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { changeDeviceStatusApi, fetchDevicesApi } from '../../api/device'

export const fetchDevices = createAsyncThunk(
  'device/fetchDevices',
  async (_, thunkApi) => {
    const [errors, payload] = await fetchDevicesApi()
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

export const changeDeviceStatus = createAsyncThunk(
  'device/changeDeviceStatus',
  async (id, thunkApi) => {
   
    const device = thunkApi.getState().device.devices.find((d) => d.id === id)
    if (!device) {
      return thunkApi.rejectWithValue('Incorrect device id id')
    }

    const [errors, payload] = await changeDeviceStatusApi(id, !device.status)
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

const initialState = {
  devices: [],
  isLoading: true,
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setDeviceStatus: (state, { payload }) => {
      const device = state.devices.find((d) => d.id === payload.id)
      if (device) device.status = payload.status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeDeviceStatus.fulfilled, (state, { payload }) => {})
    builder.addCase(changeDeviceStatus.pending, (state, action) => {})
    builder.addCase(changeDeviceStatus.rejected, (state, action) => {})

    builder.addCase(fetchDevices.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.devices = payload.map((d) => ({ ...d, status: null }))
    })
    builder.addCase(fetchDevices.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { setDeviceStatus } = deviceSlice.actions

export default deviceSlice.reducer
