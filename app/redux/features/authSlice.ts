import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: !!Cookies.get('authToken'),
  role:null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setRole:(state,action)=>{
        state.role = action.payload;
    }
  },
});

export const { setAuthenticated ,setRole } = authSlice.actions;
export default authSlice.reducer;
