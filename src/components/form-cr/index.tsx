import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";

export const FormCr: React.FC = () => {
  const { navigate } = useHistory();

  const validationForm = yup.object().shape({
    nomeAluno: yup.string().required("Informe seu nome"),
    emailAluno: yup.string().email("Email inválido").required("Informe seu email"),
    telefoneAluno: yup.string().required("Informe seu telefone"),
    nomeOrientador: yup.string().required("Informe o nome do seu orientador"),
    descricao: yup.string().required("Informe a descrição"),
    amostra: yup.string().required("Informe a amostra"),
    numeroMedicao: yup.string().required("Informe o número de medições"),
    localizacao: yup.string().required("Informe a localização"),
    leitura: yup.string().required("Informe a leitura")
  });
  
  async function handleClickForm(values: {
    nomeAluno: string;
    emailAluno: string;
    telefoneAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    //
    amostra: string;
    numeroMedicao: string;
    localizacao: string;
    leitura: string;
  }) {
    try {
      const { amostra, numeroMedicao, localizacao, leitura } = values;
      const fields = { amostra, numeroMedicao, localizacao, leitura };
      const fieldsStr = JSON.stringify(fields);
  
      const payload = {
        equipment: {"id": 1},
        project: {"id": values.projeto},
        description : values.descricao,
        status : 0,
        fields: fieldsStr
      }
  
      await api.post("/solicitation", payload);
      toast.success('Solicitação efetuada com sucesso!');
      window.setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      toast.error('Erro ao realizar solicitação');
      console.error("error", error);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Colorímetro CR 400</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "",
            emailAluno: "",
            telefoneAluno: "",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            amostra: "",
            numeroMedicao: "",
            localizacao: "",
            leitura: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
              <div className={styles.field_box}>
                <p>Amostra</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="amostra"
                    className={styles.form_error}
                  />
                  <Field
                    name="amostra"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Número de medições em cada amostra</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="numeroMedicao"
                    className={styles.form_error}
                  />
                  <Field
                    name="numeroMedicao"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Localização das medições</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="localizacao"
                    className={styles.form_error}
                  />
                  <Field
                    name="localizacao"
                    placeholder='frutas, medições na região lateral, superior, inferior, etc..'
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.row_box}>
                  <div className={styles.field_box_2}>
                    <p>Leitura</p>
                    <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" name="leitura" value="solida" />
                        CIE : L*a*b*
                      </label>
                      <label>
                        <Field type="radio" name="leitura" value="liquida" />
                        Hunter Lab: L a b
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FormFooter />
          </Form>
        </Formik>
      </div>
    </div>
  )
}