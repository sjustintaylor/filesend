import { getMagicLink, getAuthTokens } from "modules/authentication";

export const exchangeToken = async (token) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    console.error(error);
  }
};
export const sendMagicLink = async (email) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (error) {
    console.error(error);
  }
};
