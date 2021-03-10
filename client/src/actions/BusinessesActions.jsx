import {
  GET_BUSINESS,
  UPDATE_BUSINESS,
  GET_ALL_BUSINESSES,
} from "../actions/types";

var empty = "yes";

export const getBusiness = (user) => async (dispatch) => {
  const res = await fetch("/api/business", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    empty = "no";
    localStorage.setItem("currentBusiness", data._id);
  }

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
    type: GET_BUSINESS,
    payload: data,
  });
};

export const updateBusiness = (business) => async (dispatch) => {
  const postBody = {
    name: business.name,
    email: business.email,
    businessName: business.businessName,
    industry: business.industry,
    description: business.description,
    productDetails: business.productDetails,
    address: business.address,
    phone: business.phone,
    url: business.url.toUpperCase(),
  };

  var res = "";

  var id = window.localStorage.getItem("currentBusiness");

  if (empty === "no") {
    res = await fetch(`/api/business/${id}`, {
      method: "PUT",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": window.localStorage.getItem("token"),
      },
    });
  } else {
    res = await fetch("/api/business/", {
      method: "POST",
      body: JSON.stringify(postBody),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": window.localStorage.getItem("token"),
      },
    });
  }

  const data = await res.json();

  if (res.status === 200) {
    alert("Your business details have been updated!");
  }

  dispatch({
    type: UPDATE_BUSINESS,
    payload: data,
  });
};

export const getAllBusinesses = () => async (dispatch) => {
  const res = await fetch("/api/business/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": window.localStorage.getItem("token"),
    },
  });

  const data = await res.json();

  dispatch({
    type: GET_ALL_BUSINESSES,
    payload: data,
  });
};
