import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'

const validationForm = yup.object().shape({
  nomeAluno: yup.string().required("Informe seu nome"),
  emailAluno: yup.string().email("Email inválido").required("Informe seu email"),
  telefoneAluno: yup.string().required("Informe seu telefone"),
  nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
  emailOrientador: yup.string().email("Email inválido").required("Informe o email do seu orientador"),
  telefoneOrientador: yup.string().required("Informe o telefone"),
  departamento: yup.string().required("Informe o departamento"),
  naturezaProjeto: yup.string().required("Informe a natureza do projeto"),
  descricao: yup.string().required("Informe a descrição"),
  aproximacao: yup.string().required("Informe a aproximação"),
  tipoMaterial: yup.string().required("Informe o tipo de material"),
  cuidadosEspeciais: yup.string().required("Informe os cuidados especiais"),
  qtdFotos: yup.string().required("Informe a quantidade de fotos"),
  // CAMPO PARA IMAGEM
});

async function handleClickForm(values: {
  nomeAluno: string;
  emailAluno: string;
  telefoneAluno: string;
  nomeOrientador: string;
  emailOrientador: string;
  telefoneOrientador: string;
  departamento: string;
  naturezaProjeto: string;
  descricao: string;
  aproximacao: string;
  tipoMaterial: string;
  cuidadosEspeciais: string;
  qtdFotos: string;
  // CAMPO PARA IMAGEM
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormMev: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>MEV</h1>
    <div>
      <Formik
        initialValues={{
          nomeAluno: "",
          emailAluno: "",
          telefoneAluno: "",
          nomeOrientador: "",
          emailOrientador: "",
          telefoneOrientador: "",
          departamento: "",
          naturezaProjeto: "",
          descricao: "",
          aproximacao: "",
          tipoMaterial: "",
          cuidadosEspeciais: "",
          qtdFotos: ""
          // CAMPO PARA IMAGEM
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />
            <div className={styles.field_box}>
              <p>Aproximações Desejadas (40x  2000x)</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="aproximacao"
                  className={styles.form_error}
                />
                <Field
                  name="aproximacao"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Tipo de Material</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="tipoMaterial"
                    className={styles.form_error}
                  />
                  <Field
                    name="tipoMaterial"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Quantidade de Fotos por Aproximação</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="qtdFotos"
                    className={styles.form_error}
                  />
                  <Field
                    name="qtdFotos"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            <div className={styles.field_box}>
              <p>Cuidados Especiais</p>
              <div className={styles.input_box}>
                <ErrorMessage
                  component={CustomErrorMessage}
                  name="cuidadosEspeciais"
                  className={styles.form_error}
                />
                <Field
                  name="cuidadosEspeciais"
                  placeholder=''
                  className={styles.input_form}
                />
              </div>
            </div>

            {/* CAMPO PARA IMAGEM   */}
          </div>
          <FormFooter />
        </Form>
      </Formik>
    </div>
  </div>
)