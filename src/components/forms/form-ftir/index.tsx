import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";

export const FormFtir: React.FC = () => {
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
    solventeUtilizado: yup.string().required("Informe o solvente utilizado"),
  });

  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    natureza: string;
    otherProjectNature?: string;
    //
    solventeUtilizado: string
  }) {
    try {
      startButtonLoad();
      const { solventeUtilizado } = values;
      const fields = { solventeUtilizado };
      const fieldsStr = JSON.stringify(fields);

      const payload = {
        equipment: {"id": 8},
        project: {"id": values.projeto},
        description : values.descricao,
        projectNature : values.natureza,
        otherProjectNature : values.otherProjectNature,
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
      <h1 className={styles.title}>Infravermelho-FTIR</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            natureza: "",
            otherProjectNature: "",
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
            <FormFooter loading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}