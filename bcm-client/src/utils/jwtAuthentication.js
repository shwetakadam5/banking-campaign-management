// use this to decode a token and get the user's information out of it
import { jwtDecode } from "jwt-decode";

// get user data from JSON web token by decoding it
export const getAuthUserProfile = () => {
  return jwtDecode(this.getJWToken());
};

// return `true` or `false` if token exists (does not verify if it's expired yet)
export const isAuthUserloggedIn = () => {
  const token = this.getJWToken();

  return token && !this.isTokenExpired(token) ? true : false;
};

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("id_token");
    return true;
  }
  return false;
};

export const getJWToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem("id_token");
};

export const jwtlogin = (idToken) => {
  // Saves user token to localStorage and reloads the application for logged in status to take effect
  localStorage.setItem("id_token", idToken);

  // window.location.assign("/");
};

export const jwtlogout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
  // this will reload the page and reset the state of the application
  window.location.reload();
};
