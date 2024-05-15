import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWifiNetworksApi, saveAgentConfigApi } from '../../api/agent/agent'
import { pingSystemApi } from '../../api/hub/system'

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

const initialState = {
  wifiNetworks: [],
  agentLoading: false,
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWifiNetworks.fulfilled, (state, { payload }) => {
      state.wifiNetworks = payload.ssids
    })
  },
})

export const {} = systemSlice.actions

export default systemSlice.reducer
