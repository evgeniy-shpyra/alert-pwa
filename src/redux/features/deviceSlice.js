import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  changeDeviceStatusApi,
  createDeviceApi,
  deleteDeviceApi,
  fetchDevicesApi,
} from '../../api/hub/device'

export const fetchDevices = createAsyncThunk(
  'device/fetchDevices',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors, payload] = await fetchDevicesApi({ token })
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
    const token = thunkApi.getState().user.token
    const [errors, payload] = await changeDeviceStatusApi({
      deviceId: id,
      status: !device.status,
      token,
    })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

export const createDevice = createAsyncThunk(
  'device/createDevice',
  async (name, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await createDeviceApi({ name, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
  }
)

export const deleteDevice = createAsyncThunk(
  'device/delete',
  async (deviceId, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await deleteDeviceApi({ id: deviceId, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return deviceId
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
    builder.addCase(deleteDevice.fulfilled, (state, { payload }) => {
      state.devices = state.devices.filter((d) => d.id !== payload)
    })

    builder.addCase(fetchDevices.fulfilled, (state, { payload }) => {
      state.devices = payload.map((d) => ({ ...d, status: null }))
    })
  },
})

export const { setDeviceStatus } = deviceSlice.actions

export default deviceSlice.reducer
