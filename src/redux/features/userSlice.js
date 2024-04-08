import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUserApi } from '../../api/user'

export const fetchUser = createAsyncThunk(
  'user/get-user',
  async (_, thunkApi) => {
    const [errors, payload] = await fetchUserApi()
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

const initialState = {
  name: null,
  isAuthorized: null,
  isLoading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuthorized = true
      console.log("fulfilled", payload)
    })
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isAuthorized = null
      state.isLoading = true
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthorized = false
      state.isLoading = false
    })
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer
