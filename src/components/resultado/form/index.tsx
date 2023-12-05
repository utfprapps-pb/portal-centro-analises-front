import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import { Field, Form, Formik } from 'formik'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import toast from 'react-hot-toast'
import { TechnicalReport } from '../model/technical-report'
import TechnicalReportService from '@/services/api/technical-report/TechnicalReportService'
import { log } from 'console'

export function TechnicalReportForm() {
  const { id } = useParams()
  const [technicalReport, setTechnicalReport] = useState<TechnicalReport>({
    id: undefined,
    description: '',
    date: new Date(),
    solicitation: '',
    price: 0,
    amountHours: 0,
    amountSamples: 0,
    multiPartFileLists: undefined
  })
  const [errors, setErrors] = useState({ id: null, name: '' })
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const [solicitationOptions, setSolicitationOptions] = useState([]);

  useEffect(() => {
    TechnicalReportService.getSolicitationApproved()
    .then((response) => {
      setSolicitationOptions(response.data);
      /* if(!id){
        setTechnicalReport((technicalReport: TechnicalReport) => {
            return {
              ...technicalReport,
              solicitation: response.data[0]
            };
        });
      } */
    })
    .catch((erro) => {
      setApiError('Falha ao carregar a opções')
    })
    if (id) {
      TechnicalReportService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setTechnicalReport({
              id: response.data.id,
              description: response.data.description,
              date: response.data.date ? response.data.date : new Date(),
              solicitation: response.data.solicitation,
              price: response.data.price,
              amountHours: response.data.amountHours,
              amountSamples: response.data.amountSamples,
              multiPartFileLists: response.data.multiPartFileLists
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
    description: yup.string().required("Descrição é obrigatório"),
    price: yup.string().required("Preço é obrigatório"),
    amountHours: yup.string().required("Quantidade de horas é obrigatório"),
    amountSamples: yup.string().required("Quantidade de amostras é obrigatório"),
  });

  const onSubmit = (values: TechnicalReport) => {
    console.log(values)
    const data: TechnicalReport = {
      ...values,
      id: technicalReport.id,
      description: values.description,
      solicitation: technicalReport.solicitation,
      date: technicalReport.date,
      price: values.price,
      amountHours: values.amountHours,
      amountSamples: values.amountSamples
    }
    console.log(data)
    setPendingApiCall(true)
    TechnicalReportService.save(data)
      .then((response) => {
        console.log(response)
        toast.success("Sucesso ao salvar o resultado.");
        setPendingApiCall(false)
        navigate('/resultado')
      })
      .catch((error) => {
        toast.error('Falha ao salvar o resultado.');
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao salvar o resultado.')
        }
        setPendingApiCall(false)
      })
  }

  const handleSolicitationChange = (event: SelectChangeEvent) => {
    setTechnicalReport((technicalReport: TechnicalReport) => {
      if (technicalReport) {
        return {
          ...technicalReport,
          solicitation: event.target.value as any
        };
      }

      return technicalReport;
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Resultado</h1>
        <Formik
          initialValues={technicalReport}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.inputs}>
                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <Field
                    as={TextField}
                    className={styles.textField}
                    label="Descrição"
                    name="description"
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div className={styles.inputs}>
                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <Field
                    as={TextField}
                    className={styles.textField}
                    label="Preço"
                    name="price"
                    error={touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <Field
                    as={TextField}
                    className={styles.textField}
                    label="Quantidade de Horas"
                    name="amountHours"
                    error={touched.amountHours && !!errors.amountHours}
                    helperText={touched.amountHours && errors.amountHours}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <Field
                    as={TextField}
                    className={styles.textField}
                    label="Quantidade de Amostras"
                    name="amountSamples"
                    error={touched.amountSamples && !!errors.amountSamples}
                    helperText={touched.amountSamples && errors.amountSamples}
                    fullWidth
                    required
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div className={styles.inputs}>
              {solicitationOptions && solicitationOptions?.length > 0 &&
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="solicitation">Solicitação</InputLabel>
                <Select
                  autoFocus
                  value={technicalReport.solicitation}
                  onChange={handleSolicitationChange}
                  label="Solicitação"
                  labelId="solicitation"
                >
                  {solicitationOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                    {option?.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              }
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
