import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Header, Menu } from "@/components";
import { Field, Form, Formik, useFormikContext } from "formik";
import { Box, Paper, TextField, Button } from "@mui/material";
import * as yup from 'yup';
import ConfigEmailService from "@/services/api/config-email";
import toast from "react-hot-toast";

export interface ConfigEmailPageFormValues {
  id: number;
  emailFrom: string;
  passwordEmailFrom: string;
  sendHost: string;
  sendPort: number;
}

export const ConfigEmailPage = () => {
  const [configEmail, setConfigEmail] = useState<ConfigEmailPageFormValues>({
    id: 0,
    emailFrom: "",
    passwordEmailFrom: "",
    sendHost: "",
    sendPort: 0,
  });

  const handleSubmit = useCallback(
    async (values: ConfigEmailPageFormValues) => {
      ConfigEmailService.save(
        {
          id: values.id,
          emailFrom: values.emailFrom,
          passwordEmailFrom: values.passwordEmailFrom,
          sendHost: values.sendHost,
          sendPort: values.sendPort,
        }
      ).then((response) => {
        toast.success(response?.data?.message ?? 'Configurações do email salvas com sucesso.');
      })
        .catch((apiError) => {
          let messageError = apiError?.response?.data?.message ?? 'Erro ao salvar configurações do email.';
          toast.error(messageError);
        });
    },
    []
  );

  useEffect(() => {
    ConfigEmailService.find()
      .then((response) => {
        if (response.data) {
          setConfigEmail({
            id: response.data.id,
            emailFrom: response.data.emailFrom,
            passwordEmailFrom: response.data.passwordEmailFrom,
            sendHost: response.data.sendHost,
            sendPort: response.data.sendPort,
          });
        };
      })
      .catch((apiError) => {
        let messageError = apiError?.response?.data?.message ?? 'Falha ao carregar configuração do email.';
        toast.error(messageError);
      })
  }, []);

  const validationForm = yup.object().shape({
    emailFrom: yup
      .string()
      .email("Informe um email válido")
      .required("Informe o email"),
    passwordEmailFrom: yup
      .string()
      .required("Informe a senha"),
    sendHost: yup
      .string()
      .required("Informe o provedor"),
    sendPort: yup
      .number()
      .required("Informe a porta"),
  });

  return <div className={styles.container}>
    <Menu />
    <div className={styles.content}>
      <Header />

      <Paper elevation={3} className={styles.paper}>
        <h1 className={styles.title}>Configurações do email</h1>

        <Formik<ConfigEmailPageFormValues>
          initialValues={configEmail}
          onSubmit={handleSubmit}
          validationSchema={validationForm}
          enableReinitialize
        >
          <ConfigEmailPageForm />
        </Formik>
      </Paper>
    </div>
  </div>
}

const ConfigEmailPageForm: React.FC = () => {
  const { touched, errors } = useFormikContext<ConfigEmailPageFormValues>();

  return <Form className={styles.form}>
    <Field
      as={TextField}
      label="Email"
      name="emailFrom"
      className={styles.textField}
      error={touched.emailFrom && !!errors.emailFrom}
      helperText={touched.emailFrom && errors.emailFrom}
      variant="outlined"
      fullWidth
    />
    <Field
      as={TextField}
      label="Senha"
      type="password"
      name="passwordEmailFrom"
      className={styles.textField}
      error={touched.passwordEmailFrom && !!errors.passwordEmailFrom}
      helperText={touched.passwordEmailFrom && errors.passwordEmailFrom}
      variant="outlined"
      fullWidth
    />
    <Field
      as={TextField}
      label="Provedor"
      name="sendHost"
      className={styles.textField}
      error={touched.sendHost && !!errors.sendHost}
      helperText={
        touched.sendHost && errors.sendHost
      }
      variant="outlined"
      fullWidth
    />
    <Field
      as={TextField}
      label="Porta"
      name="sendPort"
      type="number"
      className={styles.textField}
      error={touched.sendPort && !!errors.sendPort}
      helperText={
        touched.sendPort && errors.sendPort
      }
      variant="outlined"
      fullWidth
    />

    <Box className={styles.buttonContainer}>
      <Button
        className={styles.button}
        color="primary"
        variant="contained"
        type="submit"
        disabled={Object.keys(errors).length > 0}
      >
        Salvar
      </Button>
    </Box>
  </Form>
};