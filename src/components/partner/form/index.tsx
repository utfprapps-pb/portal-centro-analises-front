import { useEffect, useState } from 'react'

import { Button, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import PartnerService from '../../../services/api/partner/service'
import { Partner } from '../model/partner'
import { Field, Form, Formik } from 'formik'

export function PartnerForm() {
  const { id } = useParams()
  const [partner, setPartner] = useState<Partner>({
    name: ''
  })
  const [errors, setErrors] = useState({ id: null, name: '' })
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      PartnerService.findOne(parseInt(id))
        .then((response) => {
          if (response.data) {
            setPartner({
              id: response.data.id,
              name: response.data.name
            })
            setApiError('')
          } else {
            setApiError('Falha ao carregar a instituição parceira')
          }
        })
        .catch((erro) => {
          setApiError('Falha ao carregar a instituição parceira')
        })
    }
  }, [id])

  const validationSchema = yup.object().shape({
    name: yup.string().min(4,"Deve informar no mínimo 4 caracteres").required("Nome é obrigatório"),
  });

  const onSubmit = (values: Partner) => {
    const data: Partner = {
      ...values,
      id: partner.id,
      name: values.name
    }
    setPendingApiCall(true)
    PartnerService.save(data)
      .then((response) => {
        setPendingApiCall(false)
        navigate('/partner')
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao salvar a instituição parceira.')
        }
        setPendingApiCall(false)
      })
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Instituição Parceira</h1>
        <Formik
            initialValues={partner}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <Field
                  as={TextField}
                  className={styles.textField}
                  label="Nome"
                  name="name"
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  fullWidth
                  required
                  variant="outlined"
                />
                <div className={styles.button_box}>
                  <Button variant="contained" color="primary" type="submit">
                    Salvar
                  </Button>
                </div>
              </Form>
            )}
        </Formik>
      </div>
    </>
  )
}
