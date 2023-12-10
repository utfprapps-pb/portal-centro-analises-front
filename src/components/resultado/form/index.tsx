import { ChangeEvent, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import { Button, FormControl, Input, InputLabel, TextField } from '@mui/material'
import toast from 'react-hot-toast'
import { TechnicalReport } from '../model/technical-report'
import TechnicalReportService from '@/services/api/technical-report/TechnicalReportService'
import SolicitacaoService from '@/services/api/solicitacao/SolicitacaoService'

export function TechnicalReportForm() {
  const { id, auditId } = useParams()
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
  const [errors, setErrors] = useState({
    id: undefined,
    description: undefined,
    solicitation: undefined,
    price: undefined,
    amountHours: undefined,
    amountSamples: undefined
  })
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const [arquivo, setArquivo] = useState<any|null>(undefined);

  useEffect(() => {

    if (id && id !== 'new') {
      console.log('id', id)
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
    if( auditId ){
      console.log('audit',auditId)
      SolicitacaoService.findById(parseInt(auditId))
      .then((response) => {
        console.log(response)
        if (response.data) {
          setTechnicalReport({
            ...technicalReport,
            solicitation: response.data
          })
          setApiError('')
        } else {
          setApiError('Falha ao carregar a solicitação')
        }
      })
      .catch((erro) => {
        setApiError('Falha ao carregar a solicitação')
      })
    }
  }, [])

  const onSubmit = () => {    
    const report: TechnicalReport = {
      id: technicalReport.id,
      description: technicalReport.description,
      solicitation: technicalReport.solicitation,
      date: technicalReport.date,
      price: technicalReport.price,
      amountHours: technicalReport.amountHours,
      amountSamples: technicalReport.amountSamples
    }

    const formData = new FormData();

    formData.append('image', arquivo);

    const blob = new Blob([JSON.stringify(report)], {
      type: 'application/json'
    })
    formData.append('technical_report', blob);

    setPendingApiCall(true)

    TechnicalReportService.saveUpload(formData)
      .then((response) => {
        console.log(response)
        toast.success("Sucesso ao salvar o resultado.");
        setPendingApiCall(false)
        navigate('/resultado')
      })
      .catch((error) => {
        toast.error('Falha ao salvar o resultado.');
        if (error?.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao salvar o resultado.')
        }
        setPendingApiCall(false)
      })
  }

  const onChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = event.target;
    setTechnicalReport((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const handleChangeArquivo = (event:ChangeEvent<HTMLInputElement>) => {
    setArquivo(event.target.files ? event.target.files[0] : null);
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Resultado</h1>
              <div className={styles.inputs}>
                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <TextField 
                    className={styles.textField}
                    label="Descrição"
                    name="description"
                    value={technicalReport.description}
                    fullWidth
                    required
                    variant="outlined"
                    error={errors.description}
                    onChange={onChange}
                  />
                </FormControl>
              </div>
              <div className={styles.inputs}>
                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <TextField  
                    className={styles.textField}
                    label="Preço"
                    name="price"
                    value={technicalReport.price}
                    fullWidth
                    required
                    variant="outlined"
                    error={errors.price}
                    onChange={onChange}
                  />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <TextField  
                    className={styles.textField}
                    label="Quantidade de Horas"
                    name="amountHours"
                    value={technicalReport.amountHours}
                    fullWidth
                    required
                    variant="outlined"
                    error={errors.amountHours}
                    onChange={onChange}
                  />
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth={true}>
                  <TextField  
                    className={styles.textField}
                    label="Quantidade de Amostras"
                    name="amountSamples"
                    value={technicalReport.amountSamples}
                    fullWidth
                    required
                    variant="outlined"
                    error={errors.amountSamples}
                    onChange={onChange}
                  />
                </FormControl>
              </div>
              <div className={styles.inputs}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <TextField  
                    className={styles.textField}
                    label="Solicitação"
                    name="solicitation"
                    fullWidth
                    value={technicalReport.solicitation.id + ' - ' + technicalReport.solicitation.description}
                    required
                    disabled={true}
                    variant="outlined"
                    error={errors.solicitation}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="multiPartFileLists">Arquivo</InputLabel>
                  <Input 
                    type="file"
                    className={styles.textField}
                    id="multiPartFileLists"
                    name="multiPartFileLists"
                    fullWidth
                    required
                    onChange={handleChangeArquivo}
                  />
                </FormControl>
              </div>
              <div className={styles.button_box}>
                <Button variant="contained" color="primary" type="button" onClick={onSubmit}>
                  Salvar
                </Button>
              </div>
      </div>
    </>
  )
}
