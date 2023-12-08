import { useEffect, useState } from 'react'

import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import { DomainRole } from '../model/domain-role'
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik'
import DomainRoleService from '@/services/api/domain-role/service'
import { ROLE_OPTIONS } from '@/commons/roles'
import toast from 'react-hot-toast'

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
    } else {
      let domainRoleEmpty = { ...domainRole }
      domainRoleEmpty.role = ROLE_OPTIONS[0].value;
      setDomainRole(domainRoleEmpty);
    }
  }, [])

  const validationSchema = yup.object().shape({
    domain: yup.string().min(4, "Deve informar no mínimo 4 caracteres").required("Domínio é obrigatório"),
    role: yup.string().required("Permissão é obrigatório"),
  });

  const onSubmit = (values: DomainRole) => {
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
        showMessageError(error);
        setPendingApiCall(false);
      })
  }

  const showMessageError = (error) => {
    let messageError =
      error?.response?.data?.message ??
      'Falha ao salvar domínio.'
    toast.error(messageError)
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
          {({ errors, touched, setFieldValue, values, isSubmitting }) => (
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

              <div style={{ paddingTop: '15px', textAlign: 'left' }}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-label">Permissão</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    label="Permissão"
                    onChange={(value) => setFieldValue('role', value.target.value)}
                    value={values?.role}
                  >
                    {ROLE_OPTIONS.map(option => {
                      return <MenuItem value={option.value}>{option.label}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className={styles.button_box}>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
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