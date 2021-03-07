import { GET_ALL_BLOGS, GET_LATEST_BLOGS } from "../actions/types";

const initialState = {
  blogs: [],
  latestBlogs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case GET_LATEST_BLOGS:
      return {
        ...state,
        latestBlogs: action.payload,
      };
    default:
      return state;
  }
};
