import { useEffect, useState } from 'react'

import { Button, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import { DomainRole } from '../model/domain-role'
import { Field, Form, Formik } from 'formik'
import DomainRoleService from '@/services/api/domain-role/service'
import Dropdown from '@/components/dropdown'

export function DomainRoleForm() {
  const { id } = useParams();
  const [domainRole, setDomainRole] = useState<DomainRole>({
    domain: '',
    role: '',
  });
  const [errors, setErrors] = useState({ id: null, name: '' });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      DomainRoleService.findOne(parseInt(id))
        .then((response) => {
          if (response.data) {
            setDomainRole({
              id: response.data.id,
              domain: response.data.domain,
              role: response.data.role,
            })
            setApiError('')
          } else {
            setApiError('Falha ao carregar domínio.')
          }
        })
        .catch((erro) => {
          setApiError('Falha ao carregar domínio.')
        })
    }
  }, [])

  const validationSchema = yup.object().shape({
    domain: yup.string().min(4, "Deve informar no mínimo 4 caracteres").required("Domínio é obrigatório"),
  });

  const onSubmit = (values: DomainRole) => {
    console.log('onSubmit');
    const data: DomainRole = {
      ...values,
      id: domainRole.id,
      domain: values.domain,
      role: values.role,
    }
    setPendingApiCall(true)
    DomainRoleService.save(data)
      .then((response) => {
        setPendingApiCall(false)
        navigate('/domain-role')
      })
      .catch((error) => {
        if (error.response.data?.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao salvar domínio.')
        }
        setPendingApiCall(false)
      })
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Domínios</h1>
        <Formik
          initialValues={domainRole}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={styles.form}>
              <Field
                as={TextField}
                className={styles.textField}
                label="Domínio"
                name="domain"
                error={touched.domain && !!errors.domain}
                helperText={touched.domain && errors.domain}
                fullWidth
                required
                variant="outlined"
              />

              <div className={styles.field_box}>
                <p>Permissão</p>
                <Dropdown value={domainRole?.role || ''} onChange={(value) => setFieldValue('role', value)} />
              </div>

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
