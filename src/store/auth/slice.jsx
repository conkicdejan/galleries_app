import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  login: () => {},
  logout: () => {},
  register: () => {},
  getActiveUser: () => {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    loginError: null,
    registerErrors: null,
  },
  reducers: {
    setRegisterErrors: (state, { payload }) => {
      console.log('setRegisterErrors');
      state.registerErrors = payload;
    },
    setLoginError: (state, { payload }) => {
      console.log('setLoginError');
      state.loginError = payload;
    },
    setToken: (state, { payload }) => {
      console.log('setToken');
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      console.log('setUser');
      state.user = payload;
    },
    setLogout: (state) => {
      console.log('setLogout');
      state.token = null;
      state.user = null;
    },
    ...middlewareActions,
  },
});

export const {
  setRegisterErrors,
  setLoginError,
  setToken,
  setUser,
  setLogout,

  login,
  logout,
  register,
  getActiveUser,
} = authSlice.actions;
export default authSlice.reducer;
