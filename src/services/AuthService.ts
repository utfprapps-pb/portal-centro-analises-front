import { User, UserLogin } from "../commons/type";
import { api } from "../libs/axiosBase";


const login = (user: UserLogin) => {
  return api.post("/login", user);
};

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const AuthService = {
  login,
  isAuthenticated,
};

export default AuthService;