import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";
import { FormFooterLoad } from '../form-footer-load';

export const FormUvVis: React.FC = () => {
  const { navigate } = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  function startButtonLoad() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
    varredura: yup.string().required("Informe o tipo de varredura"),
    comprimento: yup.string().required("Informe o comprimento"),
    cubeta: yup.string().required("Informe o tipo da cubeta"),
    amostra: yup.string().required("Informe o tipo da amostra")
  });

  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    natureza: string;
    //
    varredura: string;
    comprimento: string;
    cubeta: string;
    amostra: string;
  }) {
    try {
      startButtonLoad();
      const { varredura, comprimento, cubeta, amostra } = values;
      const fields = { varredura, comprimento, cubeta, amostra };
      const fieldsStr = JSON.stringify(fields);

      const payload = {
        equipment: {"id": 9},
        project: {"id": values.projeto},
        description : values.descricao,
        projectNature : values.natureza,
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
      <h1 className={styles.title}>UV/VIS</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            natureza: "",
            varredura: "",
            comprimento: "",
            cubeta: "",
            amostra: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
              <div className={styles.field_box}>
                <p>Faixa de Varredura (nm)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="varredura"
                    className={styles.form_error}
                  />
                  <Field
                    name="varredura"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.field_box}>
                <p>Comprimento de onda fixo (nm)</p>
                <div className={styles.input_box}>
                  <ErrorMessage
                    component={CustomErrorMessage}
                    name="comprimento"
                    className={styles.form_error}
                  />
                  <Field
                    name="comprimento"
                    placeholder=''
                    className={styles.input_form}
                  />
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box_2}>
                  <p>Amostra</p>
                  <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="amostra" value="solida" />
                      Sólida
                    </label>
                    <label>
                      <Field type="radio" name="amostra" value="liquida" />
                      Liquida
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box_2}>
                  <p>Cubetas</p>
                  <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="cubeta" value="acrílico" />
                      Acrílico
                    </label>
                    <label>
                      <Field type="radio" name="cubeta" value="quartzo" />
                      Quartzo
                    </label>
                    <label>
                      <Field type="radio" name="cubeta" value="vidro" />
                      Vidro
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? <FormFooterLoad /> : <FormFooter />}
          </Form>
        </Formik>
      </div>
    </div>
  )
}