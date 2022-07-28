import { call, put, takeLatest } from 'redux-saga/effects';
import AuthService from '../../services/AuthService';
import {
  setRegisterErrors,
  setLoginError,
  register,
  login,
  setUser,
  setToken,
  logout,
  setLogout,
  getActiveUser,
} from './index';

function* registerHandler({ payload }) {
  yield put(setRegisterErrors(null));
  try {
    const data = yield call(AuthService.register, payload);
    localStorage.setItem('token', data.token);
    yield put(setToken(data.token));
    yield put(setUser(data.user));
  } catch (error) {
    console.error('registerHandler', error);
    if (error.response.status === 422) {
      yield put(setRegisterErrors(error.response.data.errors));
    }
  }
}

function* loginHandler({ payload }) {
  try {
    yield put(setLoginError(null));
    const data = yield call(AuthService.login, payload);
    localStorage.setItem('token', data.token);
    yield put(setToken(data.token));
    yield put(setUser(data.user));
  } catch (error) {
    console.error('loginHandler', error);
    if (error.response.status === 401) {
      yield put(setLoginError(error.response.data.errors));
    }
  }
}

function* logoutHandler() {
  try {
    yield call(AuthService.logout);
  } catch (error) {
    console.log('logoutHandler', error);
  } finally {
    localStorage.removeItem('token');
    yield put(setLogout());
  }
}

function* getActiveUserHandler() {
  try {
    const activeUser = yield call(AuthService.getActiveUser);
    yield put(setUser(activeUser));
  } catch (error) {
    console.error('getActiveUserHandler', error);
  }
}

export function* watchLogin() {
  yield takeLatest(login.type, loginHandler);
}

export function* watchLogout() {
  yield takeLatest(logout.type, logoutHandler);
}

export function* watchRegister() {
  yield takeLatest(register.type, registerHandler);
}

export function* watchGetActiveUser() {
  yield takeLatest(getActiveUser.type, getActiveUserHandler);
}
