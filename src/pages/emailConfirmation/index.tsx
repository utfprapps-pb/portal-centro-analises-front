import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Loading } from "@/components";
import { useHistory } from "@/hooks";
import EmailConfirmService from "@/services/api/email-confirm";
import styles from "./styles.module.scss";

export const EmailConfirmationPage: React.FC = () => {
  const { hashKey } = useParams();
  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>();
  const { navigate } = useHistory();

  const redirect = () => {
    window.setTimeout(() => {
      console.log("redirect to loginnnnnnnnnnn");
      navigate("/login");
    }, 5000);
  };

  useEffect(() => {
    const checkHashKey = async () => {
      EmailConfirmService.checkHash(hashKey ?? "")
        .then((response) => {
          setIsValidEmail(response.data);
          if (response.data) {
            redirect();
          }
        })
        .catch((responseError) => {
          console.log(responseError)
        });
    };
    checkHashKey();
  }, [hashKey, isValidEmail]);

  const body = () => {
    if (isValidEmail) {
      return (
        <div className={styles.section}>
          <h4 color="primary">Email validado com sucesso</h4>
          <p color="primary">Seu endereço de email foi validado com sucesso.</p>
          <p color="primary">Agora você será redirecionado para o Login.</p>
        </div>
      );
    }
    if (isValidEmail === false) {
      return (
        <div className={styles.section}>
          <h4 color="black">Ocorreu um erro</h4>
          <p color="black">Ocorreu um erro ao validar seu email.</p>
          <p color="black">Entre em contato com o suporte.</p>
        </div>
      );
    }

    return (
      <div>
        <Loading />
      </div>
    );
  };

  return <div>{body()}</div>;
};
