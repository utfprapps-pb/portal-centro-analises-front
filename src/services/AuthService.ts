import { SignUpParams, User, UserLogin } from "../commons/type";
import { api } from "../libs/axiosBase";


const login = (user: UserLogin) => {
  return api.post("/login", user);
};

const signUp = (params: SignUpParams) => {
  params.username = params.name

  return api.post("/users", params);
};

const isAuthenticated = () => {
  return localStorage.getItem("token") ? true : false;
};

const AuthService = {
  login,
  signUp,
  isAuthenticated,
};

export default AuthService;