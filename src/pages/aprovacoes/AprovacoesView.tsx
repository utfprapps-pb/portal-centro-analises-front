import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TextField, Button, Paper, Box } from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-hot-toast'

import { FormParams } from '@/services/api/aprovacoes/aprovacoes.type'
import AprovacoesService from '@/services/api/aprovacoes/AprovacoesService'
import { Header, Menu } from '@/components'
import Breadcrumb from '@/components/breadcrumb'

import styles from './styles.module.scss'
import { api } from '@/libs'

export const AprovacoesView = () => {
  const navigate = useNavigate()

  const [apiError, setApiError] = useState('')
  const { id } = useParams()
  const [form, setForm] = useState<FormParams>({
    description: '',
    status: '',
    fields: {},
    project: {
      id: 0,
      description: '',
      subject: ''
    },
    equipment: {
      id: 0,
      form: '',
      name: '',
      valueHourPartner: 0
    },
    projectNature: ''
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
            fields: JSON.parse(response.data.fields),
            project: response.data.project,
            equipment: response.data.equipment,
            projectNature: response.data.projectNature
          })

          setApiError('')
        }
      } catch (error) {
        setApiError('Falha ao carregar solicitação.')
        toast.error(apiError)
      }
    }

    if (id) {
      loadData()
    }
  }, [])

  async function handleSubitForm(values) {
    try {
      const payload = {
        ...values,
        fields: JSON.stringify(values.fields)
      }

      await api.post('/solicitation', payload)
      toast.success('Solicitação efetuada com sucesso!')
      window.setTimeout(() => {
        navigate('/')
      }, 5000)
    } catch (error) {
      toast.error('Erro ao realizar solicitação')
      console.error('error', error)
    }
  }

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
            onSubmit={(data) => {
              handleSubitForm(data)
            }}
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
                    variant="outlined"
                  />
                ))}

                <Box className={styles.w100} m={2} pt={3}>
                  <div className={styles.formButton}>
                    <Button
                      className={styles.w100}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Salvar
                    </Button>
                  </div>

                  <div className={styles.formButton}>
                    <Button
                      className={styles.w100}
                      onClick={() => {
                        navigate('/aprovacoes')
                      }}
                      type="button"
                      variant="contained"
                      color="secondary"
                    >
                      Voltar
                    </Button>
                  </div>
                </Box>
              </Form>
          </Formik>
        </Paper>
      </div>
    </div>
  )
}
