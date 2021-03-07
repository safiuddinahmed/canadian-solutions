import {
  GET_ALL_POSTS,
  GET_USER_POSTS,
  GET_CURRENT_POST,
  GET_COMMENTS,
} from "../actions/types";

const initialState = {
  posts: [],
  comments: [],
  userPosts: [],
  currentPost: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
      };
    case GET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    default:
      return state;
  }
};
