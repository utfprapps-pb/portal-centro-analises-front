import React, { useContext } from "react";
import styles from "./styles.module.scss";
import { AuthContext } from "@/contexts";
import AuthService from "@/services/AuthService";
import { useHistory } from "@/hooks";
import { DropdownMenu } from "@/components/dropdown-menu/DropdownMenu";

export function Header() {
  const { authenticatedUser } = useContext(AuthContext);

  const { navigate } = useHistory();

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToConfigEmail = () => {
    navigate("/config-email");
  };

  return (
    <div className={styles.container}>
      <h2>
        Seja bem vindo,
        <DropdownMenu
          items={
            [
              {
                title: authenticatedUser?.displayName ?? '',
                visible: true,
                style: {
                  color: '#3f51b5',
                },
                subMenus: [
                  {
                    title: "Meu Perfil",
                    visible: true,
                    onClick: goToProfile,
                  },
                  {
                    title: "Config. Email",
                    visible: authenticatedUser?.role === 'ROLE_ADMIN',
                    onClick: goToConfigEmail,
                  },
                  {
                    title: "Sair",
                    visible: true,
                    onClick: () => {
                      AuthService.logOut();
                    },
                  }
                ]
              }
            ]
          }
        />
      </h2>
    </div >
  );
}
