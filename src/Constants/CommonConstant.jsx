import jwt_decode from "jwt-decode";
export const drawerWidth = 240;
export const getDecodedToken = () => {
  if (sessionStorage.getItem("user_token")) {
    return jwt_decode(sessionStorage.getItem("user_token"));
  } else {
    window.location.href = "/";
  }
};
