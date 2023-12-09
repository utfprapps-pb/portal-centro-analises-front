import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { api } from "../../../libs/axiosBase";
import styles from "./styles.module.scss";
import { FormFooter, FormHeader } from '@/components'
import { toast } from "react-hot-toast";
import { useHistory } from "@/hooks";

export const FormAtividadeAgua: React.FC = () => {
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
  });

  async function handleClickForm(values: {
    nomeAluno: string;
    nomeOrientador: string;
    projeto: number;
    descricao: string;
    natureza: string;
    otherProjectNature?: string;
  }) {
    try {
      startButtonLoad();

      const payload = {
        equipment: {"id": 1},
        project: {"id": values.projeto},
        description : values.descricao,
        projectNature : values.natureza,
        otherProjectNature : values.otherProjectNature,
        status : 0,
        fields: ""
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
      <h1 className={styles.title}>Atividade de Água</h1>
      <div>
        <Formik
          initialValues={{
            nomeAluno: "NOMEALUNO",
            nomeOrientador: "NOME",
            projeto: 1,
            descricao: "",
            natureza: "",
            otherProjectNature: "",
          }}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
        >
          <Form className={styles.inputs_container}>
            <div className={styles.inputs_box}>
              <FormHeader />
            </div>
            <FormFooter loading={isLoading} />
          </Form>
        </Formik>
      </div>
    </div>
  )
}