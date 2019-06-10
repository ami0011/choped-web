import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/helpers";

const initialState = {
  token: null,
  userId: null,
  oobCode: null,
  error: null,
  message: null,
  loading: false,
  authRedirectPath: "/dashboard"
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
 
  return updateObject(state, {
    token: action.idToken,
    userId: action.localId,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};
const authLogout = (state) => { 
  return updateObject(state, {
    token: null,
    userId: null
  });
};

const authDismissError = (state) => {
  return updateObject(state, {
    error: null,
    message: null,
    loading: false
  });
}

const authSetOobCode = (state, action) => {
  return updateObject(state, {
    oobCode: action.oobCode
  });
};


const authResetSuccess = (state, action) => {
  setTimeout(() => {
    authDismissError();
  }, 5000);
  return updateObject(state, {
    error: null,
    message: `${action.message} ${action.email}`,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_DISMISS_ERROR:
      return authDismissError(state, action);
    case actionTypes.AUTH_RESET_SUCCESS:
      return authResetSuccess(state, action);
    case actionTypes.AUTH_SET_OOBCODE:
      return authSetOobCode(state, action);
    default:
      return state;
  }
};

export default reducer;
