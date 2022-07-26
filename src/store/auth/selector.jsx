export function selectRegisterErrors(state) {
  return state.auth.registerErrors;
}

export function selectLoginError(state) {
  return state.auth.loginError;
}

export function selectIsAuth(state) {
  return !!state.auth.token;
}

export function selectAuthUser(state) {
  return state.auth.user;
}
