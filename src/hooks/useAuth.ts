import { useState, useEffect } from "react";
import { api } from "../libs/axiosBase";
import { AuthenticatedUser, AuthenticationResponse, UserLogin } from "../commons/type";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser>();
  const [loading, setLoading] = useState(true);
  const [verifyAuthentication, setVerifyAuthentication] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
        token
      )}`;      
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = "";
    setAuthenticatedUser(undefined);
  }

  function handleLogin(response: AuthenticationResponse) {
    localStorage.setItem("token", JSON.stringify(response.token));
    localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;
      setAuthenticatedUser(response.user);
      console.log(authenticatedUser)
      setAuthenticated(true);
  }

  function handleVerifyAuthentication() {
    if (authenticated && authenticatedUser) {
      setVerifyAuthentication(true)
      // return true;
    } else {
      var token = localStorage.getItem("token");
      var user  = localStorage.getItem("user");
      console.log("aa" + token)
      if (user !== null) {
        const obj = JSON.parse(user);
        setAuthenticatedUser(obj);
        console.log(obj)
        setAuthenticated(true);
        setVerifyAuthentication(true)
        // return true;
      }
    }
  }


  return {
    authenticated,
    authenticatedUser,
    loading,
    handleLogin,
    handleLogout,
    handleVerifyAuthentication,
    verifyAuthentication
  };
}