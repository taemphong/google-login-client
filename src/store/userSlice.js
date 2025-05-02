import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 'helloworld',
  user: null
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    login: (state,action) => {
      state.value = 'login'
      state.user = action.payload;
      console.log('user',state.user);
    },
    logout: (state) => {
      state.user = null
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { login, logout, incrementByAmount } = userSlice.actions

export default userSlice.reducer