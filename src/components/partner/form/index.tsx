import { ChangeEvent, useEffect, useState } from 'react'

import { Button } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import PartnerService from '../../../services/api/partner/service'

export function Partner() {
  const [form, setForm] = useState({
    id: undefined,
    name: ''
  })
  const [errors, setErrors] = useState({ id: null, name: '' })
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      PartnerService.findOne(parseInt(id))
        .then((response) => {
          if (response.data) {
            setForm({
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

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value
      }
    })
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined
      }
    })
  }

  const onSubmit = () => {
    const partner: any = {
      id: form.id,
      name: form.name
    }
    setPendingApiCall(true)
    PartnerService.save(partner)
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
        <form className={styles.inputs_container}>
          <div className={styles.inputs_box}>
            <div className={styles.row_box}>
              <div className={styles.field_box}>
                <p>Nome da Instituição</p>
                <div className={styles.input_box}>
                  <input
                    name="name"
                    placeholder=""
                    value={form.name}
                    onChange={onChange}
                    className={styles.input_form}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button_box}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
