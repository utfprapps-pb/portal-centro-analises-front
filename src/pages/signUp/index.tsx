/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useState } from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import styles from "./styles.module.scss";
import { CustomButton, CustomErrorMessage } from "@/components";
import AuthService from "@/services/AuthService";
import { CircularProgress } from "@material-ui/core";
import { toast } from "react-hot-toast";


export const SignUpPage: React.FC = () => {
  const [apiError, setApiError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);

  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  const handleSubmit = useCallback(
    async (values: {
      email: string;
      password: string;
      name: string;
      username: string;
    }) => {
      setPendingApiCall(true);
      AuthService.signUp(values)
        .then((response) => {
          setPendingApiCall(false);
          //TODO adicionar toast de sucesso
          navigate("/login");
          toast.success('Cadastrado com sucesso!')
        })
        .catch((apiError) => {
          toast.error('Erro ao realizar cadastro :(')
          setApiError("Erro ao realizar cadastro!");
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
      .required("Informe sua senha"),
    confirmPassword: yup
      .string()
      .min(6, "Mínimo de 6 carácteres")
      .required("Informe sua senha")
      .oneOf([yup.ref("password")], "Suas senhas não conferem"),
    name: yup
      .string()
      .min(6, "Mínimo de 6 carácteres")
      .required("Informe sua senha"),
  });

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2 className={styles.title}>Registre-se!</h2>
          </div>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              username: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationForm}
          >
            <Form className={styles.inputs_container}>
              <div className={styles.inputs_box}>
                <div className={styles.row_box}>
                  <div className={styles.field_box}>
                    <p>Nome</p>
                    <div className={styles.input_box}>
                      <ErrorMessage
                        component={CustomErrorMessage}
                        name="name"
                        className={styles.form_error}
                      />
                      <Field
                        component="input"
                        name="name"
                        type="text"
                        placeholder="Seu nome"
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                </div>
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
                        placeholder="Seu email"
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.row_box}>
                  <div className={styles.field_box}>
                    <p>Senha</p>
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
                        placeholder="Sua senha"
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.row_box}>
                  <div className={styles.field_box}>
                    <p>Confirme sua senha</p>
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
                        placeholder="Confirme sua senha"
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
                    text="Cadastrar"
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
          </Formik>
        </div>
      </div>
    </div>
  );
};
