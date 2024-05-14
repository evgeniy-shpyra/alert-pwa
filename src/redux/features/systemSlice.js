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
  async (data, thunkApi) => {
    const [errors] = await pingSystemApi(data)
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
      state.agentLoading = false
      state.wifiNetworks = payload.ssids
    })
    builder.addCase(fetchWifiNetworks.pending, (state, action) => {
      state.agentLoading = true
    })
    builder.addCase(fetchWifiNetworks.rejected, (state, action) => {
      state.agentLoading = false
    })

    builder.addCase(saveAgentData.fulfilled, (state, { payload }) => {
      state.agentLoading = false
    })
    builder.addCase(saveAgentData.pending, (state, action) => {
      state.agentLoading = true
    })
    builder.addCase(saveAgentData.rejected, (state, action) => {
      state.agentLoading = false
    })
  },
})

export const {} = systemSlice.actions

export default systemSlice.reducer
