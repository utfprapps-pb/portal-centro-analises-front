import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { CustomErrorMessage, FormFooter, FormHeader } from '@/components'
import { api } from "../../../libs/axiosBase";
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";

export const FormMev: React.FC = () => {
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
    aproximacao: yup.string().required("Informe a aproximação"),
    tipoMaterial: yup.string().required("Informe o tipo de material"),
    cuidadosEspeciais: yup.string().required("Informe os cuidados especiais"),
    qtdFotos: yup.string().required("Informe a quantidade de fotos"),
    // CAMPO PARA IMAGEM
  });

  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    natureza: string;
    otherProjectNature?: string;
    //
    aproximacao: string;
    tipoMaterial: string;
    cuidadosEspeciais: string;
    qtdFotos: string;
    // CAMPO PARA IMAGEM
  }) {
    try {
      startButtonLoad();
      const { aproximacao, tipoMaterial, cuidadosEspeciais, qtdFotos } = values;
      const fields = { aproximacao, tipoMaterial, cuidadosEspeciais, qtdFotos };
      const fieldsStr = JSON.stringify(fields);

      const payload = {
        equipment: {"id": 5},
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
      <h1 className={styles.title}>MEV</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 0,
            descricao: "",
            natureza: "",
            otherProjectNature: "",
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
            <FormFooter loading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}