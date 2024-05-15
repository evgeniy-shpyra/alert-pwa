import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createSensorApi,
  deleteSensorApi,
  fetchSensorsApi,
} from '../../api/hub/sensor'

export const fetchSensors = createAsyncThunk(
  'sensor/fetchSensors',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors, payload] = await fetchSensorsApi({ token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

export const createSensor = createAsyncThunk(
  'sensor/createSensor',
  async ({ name, actionId }, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await createSensorApi({ name, actionId, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
  }
)

export const deleteSensor = createAsyncThunk(
  'sensor/delete',
  async (sensorId, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await deleteSensorApi({ id: sensorId, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return sensorId
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
    builder.addCase(deleteSensor.fulfilled, (state, { payload }) => {
      state.sensors = state.sensors.filter((d) => d.id !== payload)
    })

    builder.addCase(fetchSensors.fulfilled, (state, { payload }) => {
      state.sensors = payload.map((s) => ({
        ...s,
        status: null,
        actionId: s.action_id,
      }))
    })
  },
})

export const { setSensorStatus } = sensorSlice.actions

export default sensorSlice.reducer
