import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchActionsApi } from '../../api/action'

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
  actions: null,
  isLoading: true,
}

export const actionSlice = createSlice({
  name: 'action',
  initialState,
  reducers: {},
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

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = deviceSlice.actions

export default actionSlice.reducer