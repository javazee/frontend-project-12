import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, password: null, error: null },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.username = null;
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    }
  },
})

export const { setUser, setToken, setError, logout } = slice.actions

export default slice.reducer
