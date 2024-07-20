// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";

// get user data from JSON web token by decoding it
export const getProfile = () => {
  return decode(this.getToken());
};

// return `true` or `false` if token exists (does not verify if it's expired yet)
export const loggedIn = () => {
  const token = this.getToken();

  return token && !this.isTokenExpired(token) ? true : false;
};

export const isTokenExpired = (token) => {
  const decoded = decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("id_token");
    return true;
  }
  return false;
};

export const getToken = () => {
  // Retrieves the user token from localStorage
  return localStorage.getItem("id_token");
};

export const login = (idToken) => {
  // Saves user token to localStorage and reloads the application for logged in status to take effect
  localStorage.setItem("id_token", idToken);
  window.location.assign("/");
};

export const logout = () => {
  // Clear user token and profile data from localStorage
  localStorage.removeItem("id_token");
  // this will reload the page and reset the state of the application
  window.location.reload();
};
