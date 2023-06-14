import React, { useState } from 'react'
import styles from './styles.module.scss'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CustomErrorMessage } from '../error-message'
import * as yup from "yup";
import { CustomButton } from '../custom-button';

export function AdminPanel() {

  const [isLoading, setIsLoading] = useState(false);

  const validationForm = yup.object().shape({
    nome: yup.string().required("Informe o nome"),
    telefone: yup.string().required("Informe o telefone"),
    cargo: yup.string().required("Informe o cargo"),
    email: yup.string().required("Informe o email"),
    orientador: yup.string()
  });

  async function handleClickForm(values: {
    nome: string;
    telefone: string;
    cargo: string;
    email: string;
    orientador: string;
  }) {
    try {
      // CHAMADA DA API
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.inputs_box}>
          <div className={styles.container}>
            <h1 className={styles.title}>PAINEL DO ADMINISTRADOR</h1>
            <div>
              <Formik
                initialValues={{
                  nome: "",
                  telefone: "",
                  cargo: "",
                  orientador: "",
                  email: ""
                }}
                onSubmit={handleClickForm}
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
                            name="nome"
                            className={styles.form_error}
                          />
                          <Field
                            name="nome"
                            placeholder=''
                            className={styles.input_form}
                          />
                        </div>
                      </div>
                      <div className={styles.field_box}>
                        <p>Telefone</p>
                        <div className={styles.input_box}>
                          <ErrorMessage
                            component={CustomErrorMessage}
                            name="telefone"
                            className={styles.form_error}
                          />
                          <Field
                            name="telefone"
                            placeholder=''
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
                            name="email"
                            placeholder=''
                            className={styles.input_form}
                          />
                        </div>
                      </div>
                      <div className={styles.field_box}>
                        <p>Cargo</p>
                        <div className={styles.input_box}>
                          <ErrorMessage
                            component={CustomErrorMessage}
                            name="cargo"
                            className={styles.form_error}
                          />
                          <Field
                            name="cargo"
                            placeholder=''
                            className={styles.input_form}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.field_box}>
                      <p>Orientador</p>
                      <div className={styles.input_box}>
                        <ErrorMessage
                          component={CustomErrorMessage}
                          name="orientador"
                          className={styles.form_error}
                        />
                        <Field
                          name="orientador"
                          placeholder=''
                          className={styles.input_form}
                        />
                      </div>
                    </div>


                    <div className={styles.button_box}>
                      <CustomButton
                        text="ATUALIZAR"
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
                    </div>

                    <div className={styles.button_box}>
                      <CustomButton
                        text="REMOVER"
                        padding="1rem"
                        textColor="white"
                        backgroundColor="#ff4444"
                        textColorHover="white"
                        backgroundColorHover="#00bbff"
                        letterSpacing="4px"
                        fontSize="16px"
                        fontWeight="400"
                        type="submit"
                      />
                    </div>

                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
