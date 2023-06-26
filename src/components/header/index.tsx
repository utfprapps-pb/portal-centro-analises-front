import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "@/contexts";
import { useHistory } from "@/hooks";
import { IconButton } from "@mui/material";
import { ExitToAppRounded } from "@material-ui/icons";
import AuthService from "@/services/AuthService";

export function Header() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h2>Seja bem vindo, {authenticatedUser?.displayName}</h2>
      <IconButton aria-label="delete" color="inherit" size="large" onClick={() => AuthService.logOut()} >
        <ExitToAppRounded/>
      </IconButton>
    </div>
  );
}
