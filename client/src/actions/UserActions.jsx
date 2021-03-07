import { LOGIN_USER, GET_USER, LOGIN_ERROR } from "../actions/types";

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
