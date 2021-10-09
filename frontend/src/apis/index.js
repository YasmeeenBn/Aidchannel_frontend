import axios from "axios";

export const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_BACKEND;

export const setAuthorizationToken = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

//All request will wait 2 seconds before timeout
//axiosClient.defaults.timeout = 2000;

//axiosClient.defaults.withCredentials = true;

const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  // request.headers.Authorization =
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTIzNDU2Nzg5IiwibmFtZSI6IlNhbXBsZSIsImlhdCI6MTUxNjIzODIzfQ.ZEBwz4pWYGqgFJc6DIi7HdTN0z5Pfs4Lcv4ZNwMr1rs";
  return request;
};

const responseHandler = (response) => {
  //if (response.status === 401) {
  //   window.location = "/login";
  // }
  return response;
};

const errorHandler = (error) => {
  return Promise.reject(error);
};

axiosClient.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

axiosClient.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export function getRequest(URL) {
  return axiosClient.get(URL).then((response) => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload).then((response) => response);
}

export function putRequest(URL, payload) {
  return axiosClient.put(URL, payload).then((response) => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(URL).then((response) => response);
}
