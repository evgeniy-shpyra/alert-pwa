import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchWifiNetworksApi, saveAgentConfigApi } from '../../api/agent/agent'

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

const initialState = {
  isConnectedToDevice: false,
  wifiNetworks: [],
  agentLoading: false,
}

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    toggleConnectedToDevice: (state, { payload }) => {
      state.isConnectedToDevice = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWifiNetworks.fulfilled, (state, { payload }) => {
      state.agentLoading = false
      state.isConnectedToDevice = true
      state.wifiNetworks = payload.ssids
    })
    builder.addCase(fetchWifiNetworks.pending, (state, action) => {
      state.agentLoading = true
    })
    builder.addCase(fetchWifiNetworks.rejected, (state, action) => {
      state.agentLoading = false
      state.isConnectedToDevice = false
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

export const { toggleConnectedToDevice } = systemSlice.actions

export default systemSlice.reducer
