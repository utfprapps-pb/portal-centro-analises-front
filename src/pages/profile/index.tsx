import React from "react";
import styles from "./styles.module.scss";
import { Header, Menu } from "@/components";
import { Field, Form, Formik } from "formik";
import { useProfile } from "./useProfile";
import { Box, Paper, TextField, Button, MenuItem } from "@mui/material";

export const ProfilePage: React.FC = () => {
  const { profileData, validations, handleOnSubmit } = useProfile();

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.content}>
        <Header />

        <Paper elevation={3} className={styles.paper}>
          <h1 className={styles.title}>Perfil</h1>

          <Formik
            initialValues={profileData}
            onSubmit={handleOnSubmit}
            validationSchema={validations}
            enableReinitialize
          >
            {({ touched, errors }) => {
              const hasErrors = Object.keys(errors).length > 0;
              return (
                <Form className={styles.form}>
                  <Field
                    as={TextField}
                    label="Nome"
                    name="name"
                    className={styles.textField}
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                  <Field
                    as={TextField}
                    label="Email"
                    name="email"
                    className={styles.textField}
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                  <Field
                    as={TextField}
                    label="Senha atual"
                    type="password"
                    name="oldPassword"
                    className={styles.textField}
                    error={touched.oldPassword && !!errors.oldPassword}
                    helperText={touched.oldPassword && errors.oldPassword}
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    label="Nova senha"
                    type="password"
                    name="password"
                    className={styles.textField}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    label="Confirmar nova senha"
                    type="password"
                    name="confirmPassword"
                    className={styles.textField}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    select
                    name="select"
                    label="Select"
                    variant="outlined"
                    className={styles.buttonContainer}
                  >
                    {}
                    <MenuItem value="opcao1">Opção 1</MenuItem>
                    <MenuItem value="opcao2">Opção 2</MenuItem>
                    <MenuItem value="opcao3">Opção 3</MenuItem>
                  </Field>

                  <Box className={styles.buttonContainer}>
                    <Button
                      className={styles.button}
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={hasErrors}
                    >
                      Alterar dados
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </div>
    </div>
  );
};
