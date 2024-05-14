import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  bulkUpdateDevicesActionsApi,
  fetchDevicesActionsApi,
} from '../../api/hub/deviceAction'

export const fetchDevicesActions = createAsyncThunk(
  'deviceAction/fetchDevicesActions',
  async (_, thunkApi) => {
    const [errors, payload] = await fetchDevicesActionsApi()
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

export const bulkUpdateDevicesActions = createAsyncThunk(
  'deviceAction/bulkUpdateDevicesActions',
  async (devicesActions, thunkApi) => {
    const [errors] = await bulkUpdateDevicesActionsApi(devicesActions)
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
  }
)



const initialState = {
  deviceAction: [],
  isLoading: true,
}

export const deviceActionSlice = createSlice({
  name: 'deviceAction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDevicesActions.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.deviceAction = payload
    })
    builder.addCase(fetchDevicesActions.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchDevicesActions.rejected, (state, action) => {
      state.isLoading = false
    })

    builder.addCase(
      bulkUpdateDevicesActions.fulfilled,
      (state, { payload }) => {
        state.isLoading = false
      }
    )
    builder.addCase(bulkUpdateDevicesActions.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(bulkUpdateDevicesActions.rejected, (state, action) => {
      state.isLoading = false
    })

    
  },
})

export const { changeMissileStatus } = deviceActionSlice.actions

export default deviceActionSlice.reducer
