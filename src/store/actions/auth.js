import * as actionTypes from "./actionTypes";
import * as endpoints from "../../utils/endpoints";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = ({ idToken, localId }) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    localId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const dismissError = () => {
  return {
    type: actionTypes.AUTH_DISMISS_ERROR,
  };
};

export const logout = () => {
  //remove stored properties from local storage
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };

    try {
      const response = await axios.post(endpoints.signin, authData);

      //Store token, userId and token expiration date in local storage
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", response.data.localId);

      //dispatch actions
      dispatch(authSuccess(response.data));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess({idToken: token, localId: userId}));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};


export const resetPasswordSuccess = (email, message) => {
    return {
      type: actionTypes.AUTH_RESET_SUCCESS,
      email,
      message
    };
};


//send reset password link
export const sendResetPasswordEmail = ({email}) => {
  
  return async dispatch => {
    dispatch(authStart());
    try {
      const resetData = { email: email, requestType: "PASSWORD_RESET" };
      const response = await axios.post(endpoints.resetPassword, resetData);
      //dispatch actions
      dispatch(
        resetPasswordSuccess(
          response.data.email,
          "Reset password instructions were sent to"
        )
      );
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};

//verify oobCode
export const setOobCode = oobCode => {
  return {
    type: actionTypes.AUTH_SET_OOBCODE,
    oobCode
  };
};

//reset password
export const resetPassword = ({password}, oobCode) => { 
  return async dispatch => {
    dispatch(authStart());
    try {
      const resetData = { newPassword: password, oobCode };
      const response = await axios.post(
        endpoints.confirmResetPassword,
        resetData
      );
      //dispatch actions
      dispatch(
        resetPasswordSuccess(
          response.data.email,
          "Password have been reset for email"
        )
      );
    } catch (error) {
      dispatch(authFail(error.response.data.error));
    }
  };
};
