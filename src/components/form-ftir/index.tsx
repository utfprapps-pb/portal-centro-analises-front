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
  solventeUtilizado: yup.string().required("Informe o solvente utilizado"),
  // CAMPOS ÚNICOS DO FORMULÁRIO
  teste: yup.string().required("Teste"),
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
  // CAMPOS ÚNICOS DO FORMULÁRIO
  solventeUtilizado: string
}) {
  try {
    // CHAMADA DA API
  } catch (error) {
    console.error("error", error);
  }
}

export const FormFtir: React.FC = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Infravermelho-FTIR</h1>
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
          // CAMPOS ÚNICOS DO FORMULÁRIO
          solventeUtilizado: ""
        }}
        onSubmit={handleClickForm}
        validationSchema={validationForm}
      >
        <Form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <FormHeader />
            <div className={styles.radio_box}>
              <h3 className={styles.sub_title}>Serviço Requerido</h3>
              <p>Espectroscopia no Infravermelho com Transformada de Fourier (FT-IR) utilizando o acessório:</p>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="condicoes" value="kbr" />
                  Pastilha de KBr
                </label>
                <label>
                  <Field type="radio" name="condicoes" value="atr" />
                  Reflectância total atenuada (Attenuated total reflectance)
                </label>
                <label>
                  <Field type="radio" name="condicoes" value="dfs" />
                  Refletância difusa (Difuse reflectance sampling)
                </label>
              </div>
            </div>
            <h3 className={styles.sub_title}>METODOLOGIA ANALÍTICA: CONDIÇÕES A SEREM UTILIZADAS </h3>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <label>
                  Amostra Sólida
                  <Field type="checkbox" name="amostraSolida" value="amostraSolida" />
                </label>
              </div>
              <div className={styles.field_box}>
                <label>
                  Amostra líquida
                  <Field type="checkbox" name="amostraLiquida" value="amostraLiquida" />
                </label>
              </div>
              <div className={styles.field_box}>
                <p>Solvente utilizado</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="solventeUtilizado"
                    className={styles.form_error}
                  />
                  <Field
                    name="solventeUtilizado"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <label>
                  Registros dos espectros: Absorbância (A)
                  <Field type="checkbox" name="absorbancia" value="absorbancia" />
                </label>
              </div>
              <div className={styles.field_box}>
                <label>
                Absorbância (T%)
                  <Field type="checkbox" name="transmitancia " value="transmitancia" />
                </label>
              </div>
            </div>

          </div>
          <FormFooter />
        </Form>
      </Formik>
    </div>
  </div>
)