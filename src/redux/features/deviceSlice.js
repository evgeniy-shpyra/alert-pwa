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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.fulfilled, (state, { payload }) => {
      state.isLoading = false
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

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = deviceSlice.actions

export default deviceSlice.reducer
