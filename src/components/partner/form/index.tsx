import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import PartnerService from '../../../services/api/partner/service'
import { Partner } from '../model/partner'
import { Field, Form, Formik } from 'formik'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import toast from 'react-hot-toast'

export function PartnerForm() {
  const { id } = useParams()
  const [partner, setPartner] = useState<Partner>({
    name: '',
    status: 'ACTIVE'
  })
  const [errors, setErrors] = useState({ id: null, name: '' })
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const options = [
    { value: 'INACTIVE', label: 'Inativo' },
    { value: 'ACTIVE', label: 'Ativo' },
  ];

  useEffect(() => {
    if (id) {
      PartnerService.findOne(parseInt(id))
        .then((response) => {
          if (response.data) {
            setPartner({
              id: response.data.id,
              name: response.data.name,
              status: response.data.status
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
  }, [])

  const validationSchema = yup.object().shape({
    name: yup.string().min(4, "Deve informar no mínimo 4 caracteres").required("Nome é obrigatório"),
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
        toast.success("Sucesso ao salvar a instituição parceira.");
        setPendingApiCall(false)
        navigate('/partner')
      })
      .catch((error) => {
        toast.error('Falha ao salvar a instituição parceira.');
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao salvar a instituição parceira.')
        }
        setPendingApiCall(false)
      })
  }

  const handleStatusChange = (event: SelectChangeEvent)  => {
    setPartner((partner: Partner) => {
      if (partner) {
        return {
          ...partner,
          status: event.target.value as string
        };
      }

      return partner;
    });
  };

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
              <div className={styles.inputs}>
                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
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
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="situacao">Situação</InputLabel>
                  <Select
                      autoFocus
                      value={partner.status}
                      onChange={handleStatusChange}
                      label="Situação"
                      labelId="situacao"
                    >
                      {options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
