import React, { useCallback, useContext, useState } from 'react'
import { CustomButton, CustomErrorMessage } from '@/components'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/auth";
import AuthService from "../../services/AuthService"
import { UserLogin } from "../../commons/type";

export const LoginPage: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);;
  const [disableSubmit, setDisableSubmit] = useState(true);
  const navigate = useNavigate();
  const { handleLogin, loading } = useContext(AuthContext);
  
  function goToSignUp() {
    navigate('/sign-up')
  }

  async function handleSubmit (values: { email: string; password: string }) {
    const userLogin: UserLogin = {
      email: values.email,
      password: values.password,
    };
    console.log(userLogin)
    AuthService.login(userLogin)
      .then((response) => {
        console.log(response)
        handleLogin(response.data);
        setPendingApiCall(false);
        navigate("/");
      })
      .catch((apiError) => {
        console.log(apiError)
        setApiError("Usuário ou senha inválidos!");
        setPendingApiCall(false);
      });
    }


  // const handleSubmit = useCallback(async (values: { email: string; password: string }) => {
  //   await handleLogin(values)
  //   navigate('/home')
  // }, [handleLogin])

  const validationForm = yup.object().shape({
    email: yup.string().required("Informe seu email"),
    password: yup.string().required("Informe sua senha"),
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.modal_content}>
          <div className={styles.modal_header}>
            <h2 className={styles.title}>Bem vindo!</h2>
            <h2 className={styles.sub_title}>Digite seus dados para continuar</h2>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationForm}
          >
            <Form className={styles.inputs_container}>
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
                        placeholder='Seu email'
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
                        placeholder='Sua senha'
                        className={styles.input_form}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.form_footer}>
                <CustomButton
                  text="Entrar"
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
                <CustomButton
                  text="Criar nova conta"
                  padding="1rem"
                  textColor="white"
                  backgroundColor="#006dac"
                  textColorHover="white"
                  backgroundColorHover="#00bbff"
                  letterSpacing="4px"
                  fontSize="16px"
                  fontWeight="400"
                  type="button"
                  onClick={goToSignUp}
                />
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  )
}
