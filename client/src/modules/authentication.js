// import { openApi, secureApi } from "modules/api";

/**
 * The in memory storage for the user's ID token
 */
let idToken;

/**
 * Requests a magic link be sent to the user
 * @param {String} email  - the user's email address
 */
export const getMagicLink = async (email) => {
  if (!email) throw new Error("Email is required");
  localStorage.setItem("email", email);
};

/**
 * Exchanges a magic link token for a set of authentication tokens
 * @param {String} token  - the magic link token
 */
export const getAuthTokens = async (token) => {
  if (!token) throw new Error("Magic link token is required");

  // Lastly, set a localstorage key so the user can logout of all tabs
  localStorage.setItem("logout", "false");
};

/**
 * Logs the user out
 */
export const logout = () => {
  idToken = undefined;
  localStorage.setItem("logout", "true");
};

/**
 * Handles the user logging out from another tab
 */
const globalLogout = (event) => {
  if (event.key === "logout") {
    idToken = undefined;
  }
};
window.addEventListener("storage", globalLogout);

export const isLoggedIn = () => {
  if (idToken) return true;
  return false;
};

/**
 * Silently refreshes the user's authentication token set
 */
// const silentRefresh = async () => {
//   // Call refresh route
// };
