import {
  LOGIN_USER,
  GET_USER,
  LOGIN_ERROR,
  REGISTER_USER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from "../actions/types";

export const loginUser = (user) => async (dispatch) => {
  const postBody = {
    email: user.email,
    password: user.password,
  };

  const res = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  const resGet = await fetch("/api/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": data.token,
    },
  });

  const userData = await resGet.json();

  if (resGet.status === 200) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", userData.name);
    localStorage.setItem("userID", userData._id);
    var pathName = window.localStorage.getItem("pathName");

    if (pathName === null) {
      window.location.assign("/");
    } else {
      window.location.assign(`${pathName}`);
    }
  }

  if (resGet.status === 401 && res.status !== 400) {
    alert("Your session has expired. Please log back in.");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userID");
    localStorage.removeItem("email");
    localStorage.removeItem("currentBusiness");
    localStorage.removeItem("empty");
    localStorage.removeItem("pathName");
    window.location.assign("/login");
  }

  var loginError = "";

  if (res.status === 400) {
    loginError = "Invalid Credentials";
  }

  dispatch({
    type: LOGIN_USER,
    payload: data.token,
  });
  dispatch({
    type: GET_USER,
    payload: userData,
  });
  dispatch({
    type: LOGIN_ERROR,
    payload: loginError,
  });
};

export const registerUser = (user) => async (dispatch) => {
  const postBody = {
    name: user.name,
    email: user.email,
    password: user.password,
  };

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: "Registration successful! Please login with your credentials.",
      });
      dispatch({
        type: REGISTER_ERROR,
        payload: "",
      });
    } else {
      let errorMessage = "Registration failed. Please try again.";
      if (data.msg) {
        errorMessage = data.msg;
      } else if (data.errors && data.errors.length > 0) {
        errorMessage = data.errors[0].msg;
      }

      dispatch({
        type: REGISTER_ERROR,
        payload: errorMessage,
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: "",
      });
    }
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: "Network error. Please check your connection and try again.",
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: "",
    });
  }
};
