import styles from './styles.module.scss'
import React, { useContext, useEffect, useState } from 'react'
import { TextField, Button, Paper, Box } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { ProjectParams } from '@/services/api/project/project.type'
import { FormParams } from '@/services/api/aprovacoes/aprovacoes.type'
import ProjectService from '@/services/api/project/ProjectService'
import AprovacoesService from '@/services/api/aprovacoes/AprovacoesService'
import { toast } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '@/contexts'
import { StudentsParams } from '@/services/api/project/project.type'
import { Header, Menu } from '@/components'
import StudentService from '@/services/api/students/StudentService'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import Breadcrumb from '@/components/breadcrumb'

export const AprovacoesView = () => {
  const navigate = useNavigate()

  const [apiError, setApiError] = useState('')
  const { id } = useParams()
  const [form, setForm] = useState<FormParams>({
    description: '',
    status: '',
    fields: {}
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await AprovacoesService.findById(Number(id))

        if (response.data) {
          setForm({
            id: response.data.id,
            description: response.data.description,
            status: response.data.status,
            fields: JSON.parse(response.data.fields)
          })

          setApiError('')
        }
      } catch (error) {
        setApiError('Falha ao carregar solicitação.')
        toast.error(apiError)
        console.log(error)
      }
    }

    if (id) {
      loadData()
    }
  }, [])

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.middle}>
        <Header />
        <Breadcrumb />
        <Paper
          className={styles.containerForm}
          elevation={3}
          variant="outlined"
        >
          <Formik
            initialValues={form}
            onSubmit={() => navigate(`/aprovacoes`)}
            enableReinitialize={true}
          >
              <Form className={styles.form}>
                {Object.entries(form.fields).map(([campo, valor]) => (
                  <Field
                    key={campo}
                    as={TextField}
                    className={styles.textField}
                    label={campo}
                    id={campo}
                    name={campo}
                    value={valor}
                    fullWidth
                    disabled
                    variant="outlined"
                  />
                ))}

                <Box className={styles.w100} m={2} pt={3}>
                  <Button
                    className={styles.w100}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Voltar
                  </Button>
                </Box>
              </Form>
          </Formik>
        </Paper>
      </div>
    </div>
  )
}
