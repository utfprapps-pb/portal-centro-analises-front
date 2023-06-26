import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "@/contexts";
import { IconButton } from "@mui/material";
import { ExitToAppRounded } from "@material-ui/icons";
import AuthService from "@/services/AuthService";
import { useHistory } from "@/hooks";

export function Header() {
  const { authenticatedUser } = useContext(AuthContext);

  const { navigate } = useHistory();

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <h2 onClick={goToProfile}>
        Seja bem vindo, {authenticatedUser?.displayName}
      </h2>
      <IconButton
        aria-label="delete"
        color="inherit"
        size="large"
        onClick={() => AuthService.logOut()}
      >
        <ExitToAppRounded />
      </IconButton>
    </div>
  );
}
