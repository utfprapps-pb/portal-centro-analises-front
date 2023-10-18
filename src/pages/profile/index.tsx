import React from 'react'
import styles from './styles.module.scss'
import { Header, Menu } from '@/components'
import { Field, Form, Formik } from 'formik'
import { useProfile } from './useProfile'
import { Box, Paper, TextField, Button, Divider } from '@mui/material'
import { ProfessorParams } from '@/services/api/professor/professor.type'

import Select from 'react-select'
import Breadcrumb from '@/components/breadcrumb'

export const ProfilePage: React.FC = () => {
  const {
    profileData,
    validations,
    handleOnSubmit,
    professors,
    professorSelected,
    setProfessorSelected,
    handleOnSubmitProfessorLink,
    excludeProfessorLink
  } = useProfile()

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.content}>
        <Header />

        <Breadcrumb />

        <Paper elevation={3} className={styles.paper}>
          <h1 className={styles.title}>Perfil</h1>

          <Formik
            initialValues={profileData}
            onSubmit={handleOnSubmit}
            validationSchema={validations}
            enableReinitialize
          >
            {({ touched, errors }) => {
              const hasErrors = Object.keys(errors).length > 0
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
              )
            }}
          </Formik>
          <Divider />

          {professors.length > 0 && (
            <Formik onSubmit={handleOnSubmitProfessorLink} initialValues={{}}>
              <Form className={styles.form}>
                <Select
                  className={styles.buttonContainer}
                  onChange={(optionsSelected: any) => {
                    if (optionsSelected == null) {
                      excludeProfessorLink()
                    } else {
                      setProfessorSelected(optionsSelected)
                    }
                  }}
                  aria-label="Professores"
                  placeholder="Professores"
                  defaultValue={professorSelected}
                  value={professorSelected}
                  getOptionValue={(p: ProfessorParams) => p.id.toString()}
                  getOptionLabel={(p: ProfessorParams) =>
                    p.siape != null ? p.name + ' ' + p.siape : p.name
                  }
                  isClearable={true}
                  isSearchable={true}
                  options={professors}
                  name="professors"
                />
                <Box className={styles.buttonContainer}>
                  <Button
                    className={styles.button}
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={professorSelected == null}
                  >
                    Solicitar vinculo
                  </Button>
                </Box>
              </Form>
            </Formik>
          )}
        </Paper>
      </div>
    </div>
  )
}
