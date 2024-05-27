import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWifiNetworksApi, saveAgentConfigApi } from '../../api/agent/agent'
import {
  changeSystemStatusApi,
  fetchSystemStatusApi,
  pingSystemApi,
} from '../../api/hub/system.js'
import { resetSensorStatuses } from './sensorSlice.js'

export const fetchWifiNetworks = createAsyncThunk(
  'system/getWifiNetworks',
  async (_, thunkApi) => {
    const [errors, payload] = await fetchWifiNetworksApi()
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)
export const saveAgentData = createAsyncThunk(
  'system/saveAgentData',
  async (data, thunkApi) => {
    const [errors] = await saveAgentConfigApi(data)
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return data
  }
)
export const pingSystem = createAsyncThunk(
  'system/pingSystem',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await pingSystemApi({ token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return data
  }
)
export const changeSystemStatus = createAsyncThunk(
  'system/changeSystemStatus',
  async (status, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await changeSystemStatusApi({ token, status })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return status
  }
)
export const fetchSystemStatus = createAsyncThunk(
  'system/fetchSystemStatus',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors, payload] = await fetchSystemStatusApi({ token })
    
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }

    return payload
  }
)

const initialState = {
  wifiNetworks: [],
  agentLoading: false,
  status: null,
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWifiNetworks.fulfilled, (state, { payload }) => {
      state.wifiNetworks = payload.ssids
    })
    builder.addCase(fetchSystemStatus.fulfilled, (state, { payload }) => {
      state.status = payload.status
    })
    builder.addCase(changeSystemStatus.fulfilled, (state, { payload }) => {
      state.status = payload
    })
  },
})

export const {} = systemSlice.actions

export default systemSlice.reducer
