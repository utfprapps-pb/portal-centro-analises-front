import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "@/contexts";
import { Button, Menu, MenuItem } from "@mui/material";
import AuthService from "@/services/AuthService";
import { useHistory } from "@/hooks";

export function Header() {
  const { authenticatedUser } = useContext(AuthContext);

  const { navigate } = useHistory();

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToConfigEmail = () => {
    navigate("/config-email");
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.container}>
      <h2>
        Seja bem vindo,
        <Button
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="text"
          size="small"
          onClick={handleClick}
          style={{
            color: "#3f51b5",
          }}
        >
          {authenticatedUser?.displayName}
        </Button>
        <Menu
          id="demo-positioned-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={goToProfile}>Meu Perfil</MenuItem>
          {authenticatedUser && authenticatedUser.role == 'ROLE_ADMIN' &&
            <>
              <MenuItem onClick={goToConfigEmail}>Config. Email </MenuItem>
            </>
          }
          <MenuItem
            onClick={() => {
              AuthService.logOut();
              handleClose;
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </h2>
    </div >
  );
}
