import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchDevicesApi } from '../../api/device'

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

const initialState = {
  devices: null,
  isLoading: true,
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    toggleDeviceOnline: (state, { payload }) => {
      state.devices = state.devices.map((d) => {
        if (d.id == payload.id) d.isOnline = payload.isOnline
        return d
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, { payload }) => {
      state.isLoading = false
      console.log(payload)
      state.devices = payload
    })
    builder.addCase(fetchDevices.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchDevices.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { toggleDeviceOnline } = deviceSlice.actions

export default deviceSlice.reducer
