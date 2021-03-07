import { combineReducers } from "redux";
import AppbarReducer from "./AppbarReducer";
import BusinessesReducer from "./BusinessesReducer";
import BlogsReducer from "./BlogsReducer";
import ForumsReducer from "./ForumsReducer";
import UserReducer from "./UserReducer";

/**
 * root reducer is a combined Reducer for the store
 */
const rootReducer = combineReducers({
  appbar: AppbarReducer,
  businesses: BusinessesReducer,
  blogs: BlogsReducer,
  forums: ForumsReducer,
  user: UserReducer,
});
export default rootReducer;
