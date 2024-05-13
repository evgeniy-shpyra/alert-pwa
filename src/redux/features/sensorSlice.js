import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchSensorsApi } from '../../api/sensor'

export const fetchSensors = createAsyncThunk(
  'sensor/fetchSensors',
  async (_, thunkApi) => {
    const [errors, payload] = await fetchSensorsApi()
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

const initialState = {
  sensors: [],
  isLoading: true,
}

export const sensorSlice = createSlice({
  name: 'sensor',
  initialState,
  reducers: {
    toggleDeviceOnline: (state, { payload }) => {
      state.sensors = state.sensors
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSensors.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.sensors = payload.map((d) => ({ ...d, status: null }))
    })
    builder.addCase(fetchSensors.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchSensors.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { toggleDeviceOnline } = sensorSlice.actions

export default sensorSlice.reducer
