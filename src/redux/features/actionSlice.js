import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createActionApi,
  deleteActionApi,
  fetchActionsApi,
} from '../../api/hub/action'

export const fetchActions = createAsyncThunk(
  'action/fetchActions',
  async (_, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors, payload] = await fetchActionsApi({ token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return payload
  }
)

export const createAction = createAsyncThunk(
  'action/createAction',
  async (name, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await createActionApi({ name, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
  }
)

export const deleteAction = createAsyncThunk(
  'action/deleteAction',
  async (actionId, thunkApi) => {
    const token = thunkApi.getState().user.token
    const [errors] = await deleteActionApi({ id: actionId, token })
    if (errors) {
      return thunkApi.rejectWithValue(errors)
    }
    return actionId
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
      state.actions = payload
    })

    builder.addCase(deleteAction.fulfilled, (state, { payload }) => {
      state.actions = state.actions.filter((a) => a.id !== payload)
    })
  },
})

export const { changeMissileStatus } = actionSlice.actions

export default actionSlice.reducer
