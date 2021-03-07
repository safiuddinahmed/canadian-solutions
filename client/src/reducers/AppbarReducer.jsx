import { UPDATE_APPBAR } from "../actions/types";

const initialState = {
  menuSelected: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_APPBAR:
      return {
        ...state,
        menuSelected: action.payload,
      };
    default:
      return state;
  }
};
