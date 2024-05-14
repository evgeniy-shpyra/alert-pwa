import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchActionsApi } from '../../api/hub/action'

export const fetchActions = createAsyncThunk(
  'alarm/fetchActions',
  async (_, thunkApi) => {
    const [errors, payload] = await fetchActionsApi()
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

const initialState = {
  actions: [],
  isLoading: true,
}

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {
    changeMissileStatus: (state, { payload }) => {
      state.actions = state.actions.map((a) => {
        if (a.id === payload.id) a.status = payload.status
        return a
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchActions.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.actions = payload
    })
    builder.addCase(fetchActions.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchActions.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { changeMissileStatus } = actionSlice.actions

export default actionSlice.reducer
