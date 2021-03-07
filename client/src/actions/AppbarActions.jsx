import { UPDATE_APPBAR } from "../actions/types";

export const updateAppbar = (menuSelected) => async (dispatch) => {
  dispatch({
    type: UPDATE_APPBAR,
    payload: menuSelected,
  });
};