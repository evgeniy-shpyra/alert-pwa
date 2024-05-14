import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createSensorApi, fetchSensorsApi } from '../../api/hub/sensor'

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

export const createSensor = createAsyncThunk(
  'sensor/createSensor',
  async ({ name, actionId }, thunkApi) => {
    const [errors] = await createSensorApi({ name, actionId })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
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
    setSensorStatus: (state, { payload }) => {
      const sensor = state.sensors.find((d) => d.id === payload.id)
      if (sensor) sensor.status = payload.status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSensors.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.sensors = payload.map((s) => ({
        ...s,
        status: null,
        actionId: s.action_id,
      }))
    })
    builder.addCase(fetchSensors.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchSensors.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { setSensorStatus } = sensorSlice.actions

export default sensorSlice.reducer
