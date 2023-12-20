import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import * as yup from "yup";
import styles from "./styles.module.scss";
import { FormFooter, FormHeader } from '@/components'
import { useHistory } from "@/hooks";
import { FormProps } from '@/components/forms/FormProps';
import { useParams } from 'react-router-dom';
import { ATIVIDADE_AGUA_EMPTY, AtividadeAgua } from '@/components/forms/form-atividade-agua/AtividadeAgua';
import { loadFormBySolicitation, sendSolicitationForm } from '@/components/forms/FormUtils';

export const FormAtividadeAgua: React.FC<FormProps> = (props: Readonly<FormProps>) => {
  const { navigate } = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [atividadeAgua, setAtividadeAgua] = useState<AtividadeAgua>(ATIVIDADE_AGUA_EMPTY);

  useEffect(() => {
    if (id) {
      const form = loadFormBySolicitation(props.solicitation);
      if (form) {
        setAtividadeAgua(form);
      }
    }
  }, []);

  const validationForm = yup.object().shape({
    nomeAluno: yup.string(),
    nomeOrientador: yup.string(),
    descricao: yup.string().required("Informe a descrição"),
  });

  async function handleClickForm(values: AtividadeAgua) {
    setIsLoading(true);

    const fieldsStr = '';
    const payload = {
      equipment: { id: 1 },
      project: { id: values.projeto },
      description: values.descricao,
      projectNature: values.natureza,
      otherProjectNature: values.otherProjectNature,
      status: 0,
      fields: fieldsStr
    }
    await sendSolicitationForm(
      payload,
      props.solicitation,
      id);
    window.setTimeout(() => {
      navigate(id ? '/historico' : '/');
    }, 1000);

    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Atividade de Água</h1>
      <div>
        <Formik
          initialValues={atividadeAgua}
          onSubmit={handleClickForm}
          validationSchema={validationForm}
          enableReinitialize={true}
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