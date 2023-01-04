import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  is_loading: false,
  error: false
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.error = false;
      state.is_loading = true;

    },  
    loginSuccess: (state,action) => {
      state.is_loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },  
    loginFailed: (state) => {
      state.is_loading = false;
      state.error = true;
    },  
    logout: (state) => {
      return initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginStart,loginSuccess,loginFailed,logout } = UserSlice.actions

export default UserSlice.reducer