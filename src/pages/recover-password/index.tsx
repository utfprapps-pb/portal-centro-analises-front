import React, { useCallback, useState } from "react";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-hot-toast";

import styles from "./styles.module.scss";
import { CustomButton, CustomErrorMessage } from "@/components";
import { CircularProgress } from "@material-ui/core";
import UserService from "@/services/api/user";

export interface RecoverPasswordPageFormValues {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}

export const RecoverPasswordPage: React.FC = () => {
  const [apiError, setApiError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    async (values: RecoverPasswordPageFormValues) => {
      setPendingApiCall(true);
      UserService.recoverPassword(
        {
          email: values.email,
          code: values.code,
          newPassword: values.password,
        }
      ).then((response) => {
          setPendingApiCall(false);
          console.log(response);
          navigate("/login");
          toast.success(response?.data?.message ?? 'Senha recuperada com sucesso.');
        })
        .catch((apiError) => {
          let messageError = apiError?.response?.data?.message ?? 'Erro ao recuperar senha.';
          toast.error(messageError);
          setApiError(messageError);
          setPendingApiCall(false);
        });
    },
    []
  );
  const validationForm = yup.object().shape({
    email: yup
      .string()
      .email("Informe um email válido")
      .required("Informe seu email"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 carácteres")
      .required("Informe sua nova senha"),
    confirmPassword: yup
      .string()
      .min(6, "Mínimo de 6 carácteres")
      .required("Informe sua nova senha")
      .oneOf([yup.ref("password")], "Suas senhas não conferem"),
    code: yup
      .string()
      .required("Informe o código enviado por email"),
  });

  return <div>
    <div className={styles.container}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2 className={styles.title}>Recuperação de senha!</h2>
        </div>
        <Formik<RecoverPasswordPageFormValues>
          initialValues={{
            email: "",
            code: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationForm}>
          <RecoverPasswordPageForm/>
        </Formik>
      </div>
    </div>
  </div>
}

const RecoverPasswordPageForm: React.FC = () => {
  const [apiError, setApiError] = useState("");
  const { values } = useFormikContext<RecoverPasswordPageFormValues>();
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [pendingApiRecoverPasswordCall, setPendingApiRecoverPasswordCall] = useState(false);
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  function sendCodeRecoverPassword() {
    if (values?.email !== "") {
      setPendingApiRecoverPasswordCall(true);
      UserService.sendEmailCodeRecoverPassword(values.email)
        .then((response) => {
          setPendingApiRecoverPasswordCall(false);
          toast.success('Código enviado com sucesso.');
        })
        .catch((apiError) => {
          let messageError = apiError?.response?.data?.message ?? 'Erro ao enviar código por email.';
          toast.error(messageError);
          setApiError(messageError);
          setPendingApiRecoverPasswordCall(false);
        });
    }
  }

  return <Form className={styles.inputs_container}>
    <div className={styles.inputs_box}>
      <div className={styles.row_box}>
        <div className={styles.field_box}>
          <p>Email</p>
          <div className={styles.input_box}>
            <ErrorMessage
              component={CustomErrorMessage}
              name="email"
              className={styles.form_error}
            />
            <Field
              component="input"
              name="email"
              type="text"
              placeholder="Confirme seu email"
              className={styles.input_form}
            />
          </div>
        </div>
      </div>

      <div className={styles.row_box}>
        <div className={styles.field_box}>
          <div className={`${styles.row_box} ${styles.justify_content_space_between}`}>
            <p>Código enviado por email</p>
            <div className={styles.recover_password_link}>
              <a className={styles.margin_7px} onClick={sendCodeRecoverPassword}>
                Receber código por email
              </a>
              {pendingApiRecoverPasswordCall ? (<CircularProgress size={15} />) : (<div></div>)}
            </div>
          </div>
          <div className={styles.input_box}>
            <ErrorMessage
              component={CustomErrorMessage}
              name="code"
              className={styles.form_error}
            />
            <Field
              component="input"
              name="code"
              type="text"
              placeholder="Código"
              className={styles.input_form}
            />
          </div>
        </div>
      </div>

      <div className={styles.row_box}>
        <div className={styles.field_box}>
          <p>Nova senha</p>
          <div className={styles.input_box}>
            <ErrorMessage
              component={CustomErrorMessage}
              name="password"
              className={styles.form_error}
            />
            <Field
              component="input"
              name="password"
              type="password"
              placeholder="Sua nova senha"
              className={styles.input_form}
            />
          </div>
        </div>
      </div>
      <div className={styles.row_box}>
        <div className={styles.field_box}>
          <p>Confirme sua nova senha</p>
          <div className={styles.input_box}>
            <ErrorMessage
              component={CustomErrorMessage}
              name="confirmPassword"
              className={styles.form_error}
            />
            <Field
              component="input"
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua nova senha"
              className={styles.input_form}
            />
          </div>
        </div>
      </div>
    </div>
    <div className={styles.form_footer}>
      {pendingApiCall ? (
        <div>
          <CircularProgress />
        </div>
      ) : (
        <CustomButton
          text="Recuperar senha"
          padding="1rem"
          textColor="white"
          backgroundColor="#006dac"
          textColorHover="white"
          backgroundColorHover="#00bbff"
          letterSpacing="4px"
          fontSize="16px"
          fontWeight="400"
          type="submit"
        />
      )}

      <CustomButton
        text="Ir para o login"
        padding="1rem"
        textColor="black"
        backgroundColor="white"
        textColorHover="black"
        backgroundColorHover="white"
        letterSpacing="4px"
        fontSize="16px"
        fontWeight="400"
        type="button"
        onClick={goToLogin}
      />
    </div>
  </Form>
}