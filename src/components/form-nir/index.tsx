import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";
import { FormFooterLoad } from '../form-footer-load';

export const FormNir: React.FC = () => {
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
    onda: yup.string().required("Informe o número de onda"),
    resolucao: yup.string().required("Informe a resolução"),
    acumulacao: yup.string().required("Informe as acumulações"),
    parametro: yup.string().required("Informe o parâmetro"),
    amostra: yup.string().required("Informe o tipo da amostra"),
    solvente: yup.string().required("Informe o solvente")
  });
  
  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    natureza: string;
    //
    onda: string;
    resolucao: string;
    acumulacao: string;
    parametro: string;
    amostra: string;
    solvente: string;
  }) {
    try {
      startButtonLoad();
      const { onda, resolucao, acumulacao, parametro, amostra, solvente } = values;
      const fields = { onda, resolucao, acumulacao, parametro, amostra, solvente };
      const fieldsStr = JSON.stringify(fields);
  
      const payload = {
        equipment: {"id": 7},
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
      <h1 className={styles.title}>Infravermelho-NIR</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            natureza: "",
            onda: "",
            resolucao: "",
            acumulacao: "",
            parametro: "",
            amostra: "",
            solvente: ""
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <p>Número de onda (cm-1)</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="onda"
                      className={styles.form_error}
                    />
                    <Field
                      name="onda"
                      placeholder=''
                      className={styles.input_form}
                    />
                  </div>
                </div>
                <div className={styles.field_box}>
                  <p>Resolução (cm-1)</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="resolucao"
                      className={styles.form_error}
                    />
                    <Field
                      name="resolucao"
                      placeholder=''
                      className={styles.input_form}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <p>Acumulações</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="acumulacao"
                      className={styles.form_error}
                    />
                    <Field
                      name="acumulacao"
                      placeholder=''
                      className={styles.input_form}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.row_box}>
                  <div className={styles.field_box_2}>
                    <p>Parâmetros Ópticos</p>
                    <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" name="parametro" value="solida" />
                        Absorbância(A)
                      </label>
                      <label>
                        <Field type="radio" name="parametro" value="liquida" />
                        Transmitância(T%)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.row_box}>
                  <div className={styles.field_box_2}>
                    <p>Amostra</p>
                    <div role="group" className={styles.radio_box} aria-labelledby="my-radio-group">
                      <label>
                        <Field type="radio" name="amostra" value="solida" />
                        Amostra sólida
                      </label>
                      <label>
                        <Field type="radio" name="amostra" value="liquida" />
                        Amostra líquida
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.row_box}>
                <div className={styles.field_box}>
                  <p>Solvente utilizado</p>
                  <div className={styles.input_box}>
                    <ErrorMessage
                      component={CustomErrorMessage}
                      name="solvente"
                      className={styles.form_error}
                    />
                    <Field
                      name="solvente"
                      placeholder=''
                      className={styles.input_form}
                    />
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