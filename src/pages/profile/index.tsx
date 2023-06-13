import React from "react";
import styles from "./styles.module.scss";
import { Header, Menu } from "@/components";
import { Field, Form, Formik } from "formik";
import { useProfile } from "./useProfile";
import { Box, Paper, TextField, Button } from "@mui/material";

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
                    label="Senha"
                    name="password"
                    className={styles.textField}
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    variant="outlined"
                    fullWidth
                  />
                  <Field
                    as={TextField}
                    label="Confirmar senha"
                    name="confirmPassword"
                    className={styles.textField}
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
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
