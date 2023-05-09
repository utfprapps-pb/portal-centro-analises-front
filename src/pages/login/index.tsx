import React, { useCallback } from 'react'
import { CustomButton, CustomErrorMessage } from '@/components'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import styles from "./styles.module.scss";

export const LoginPage: React.FC = () => {
  const { loading, handleSignIn } = useAuth()
  const navigate = useNavigate();

  function goToSignUp() {
    navigate('/sign-up')
  }

  const handleSubmit = useCallback(async (values: { email: string; password: string }) => {
    await handleSignIn(values)
  }, [handleSignIn])

  const validationForm = yup.object().shape({
    email: yup.string().email("Email inválido").required("Informe seu email"),
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
