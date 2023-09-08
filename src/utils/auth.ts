import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const expiration = localStorage.getItem("expiration");
  const expirationDate = new Date(expiration!);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  if (!localStorage.getItem("token")) {
    return null;
  }
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}
