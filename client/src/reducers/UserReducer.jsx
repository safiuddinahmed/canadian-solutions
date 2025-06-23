import {
  LOGIN_USER,
  GET_USER,
  LOGIN_ERROR,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  token: "",
  userInfo: null,
  loginError: "",
  registerError: "",
  registerSuccess: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: action.payload,
      };
    default:
      return state;
  }
};
