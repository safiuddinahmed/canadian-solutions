import {
  NEW_POST,
  GET_ALL_POSTS,
  GET_USER_POSTS,
  GET_CURRENT_POST,
  GET_COMMENTS,
  POST_COMMENT,
} from "../actions/types";

export const newForumPost = (post) => async (dispatch) => {
  const postBody = {
    title: post.title,
    description: post.description,
    name: window.localStorage.getItem("name"),
  };

  const res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    window.location.reload();
  }

  dispatch({
    type: NEW_POST,
    payload: data,
  });
};

export const getAllPosts = (post) => async (dispatch) => {
  const res = await fetch("/api/posts/all", {
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
    type: GET_ALL_POSTS,
    payload: data,
  });
};

export const getUserPosts = (post) => async (dispatch) => {
  const res = await fetch("/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  dispatch({
    type: GET_USER_POSTS,
    payload: data,
  });
};

export const getCurrentPost = (id) => async (dispatch) => {
  const res = await fetch(`/api/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  dispatch({
    type: GET_CURRENT_POST,
    payload: data,
  });
};

export const getComments = (id) => async (dispatch) => {
  const postBody = {
    post: id,
  };

  const res = await fetch("/api/comments/get", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  dispatch({
    type: GET_COMMENTS,
    payload: data,
  });
};

export const postComment = (id, comment) => async (dispatch) => {
  const postBody = {
    post: id,
    description: comment.description,
    name: window.localStorage.getItem("name"),
  };

  const res = await fetch("/api/comments/", {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  dispatch({
    type: POST_COMMENT,
    payload: data,
  });
};
