import { LOGIN_USER, GET_USER, LOGIN_ERROR } from "../actions/types";

const initialState = {
  token: "",
  userInfo: null,
  loginError: "",
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
    default:
      return state;
  }
};
