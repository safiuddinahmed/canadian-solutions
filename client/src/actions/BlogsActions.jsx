import { GET_ALL_BLOGS, GET_LATEST_BLOGS } from "../actions/types";

export const getBlogs = () => async (dispatch) => {
  const res = await fetch("/api/blog/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (res.status === 401) {
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

  dispatch({
    type: GET_ALL_BLOGS,
    payload: data,
  });
};

export const getLatestBlogs = () => async (dispatch) => {
  const res = await fetch("/api/blog/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (res.status === 401) {
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

  dispatch({
    type: GET_LATEST_BLOGS,
    payload: data,
  });
};
