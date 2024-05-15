import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createUserApi,
  deleteUserApi,
  fetchUserApi,
  fetchUsersApi,
  loginUserApi,
} from '../../api/hub/user'

export const fetchUser = createAsyncThunk('user/get', async (_, thunkApi) => {
  const token = thunkApi.getState().user.token
  const [errors, payload] = await fetchUserApi({ token })
  if (errors) {
    return thunkApi.rejectWithValue(errors)
  }
  return payload
})
export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors, payload] = await fetchUsersApi({ token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

export const createUser = createAsyncThunk(
  'user/create',
  async ({ login, password }, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await createUserApi({ login, password, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
  }
)
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ login, password }, thunkApi) => {
    const [errors, payload] = await loginUserApi({ login, password })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return { login, password, ...payload }
  }
)

export const deleteUser = createAsyncThunk(
  'user/delete',
  async (userId, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await deleteUserApi({ id: userId, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return userId
  }
)

const initialState = {
  users: [],
  login: null,
  token: localStorage.getItem('token'),
  isAuthorized: null,
  isLoading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isAuthorized = true
      state.login = payload.login

      state.token = payload.token
      localStorage.setItem('token', payload.token)
    })
    builder.addCase(loginUser.pending, (state, action) => {
      state.isAuthorized = null
      state.isLoading = true
      state.token = ''
      localStorage.removeItem('token')
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isAuthorized = false
      state.isLoading = false
    })

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      if (!state.users.length && isAuthorized) {
        state.isAuthorized = false
      }
    })

    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.users = payload
    })

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.isAuthorized = true
      state.login = payload.login
    })
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isAuthorized = null
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthorized = false
    })

    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.users = state.users.filter((d) => d.id !== payload)
    })
  },
})

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer
