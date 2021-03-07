import {
  GET_BUSINESS,
  UPDATE_BUSINESS,
  GET_BUSINESS_EMPTY,
  GET_ALL_BUSINESSES,
} from "../actions/types";

const initialState = {
  businesses: [
    {
      name: "",
      email: "",
      businessName: "",
      industry: "",
      description: "",
      productDetails: "",
      address: "",
      phone: "",
    },
  ],
  currentBusiness: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_BUSINESS:
      return {
        ...state,
        currentBusiness: action.payload,
      };
    case GET_BUSINESS_EMPTY:
      return {
        ...state,
        currentBusiness: action.payload,
      };
    case UPDATE_BUSINESS:
      return {
        ...state,
        currentBusiness: action.payload,
      };
    case GET_ALL_BUSINESSES:
      return {
        ...state,
        businesses: action.payload,
      };
    default:
      return state;
  }
};
