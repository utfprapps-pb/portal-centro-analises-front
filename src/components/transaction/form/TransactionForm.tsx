import { useEffect, useState } from 'react'

import { Button, TextField } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import styles from './styles.module.scss'
import TransactionService from '../../../services/api/transaction/TransactionService'
import { Transaction } from '../model/transaction'
import { Field, Form, Formik } from 'formik'
import { UserParams } from '@/services/api/transaction/transaction.type'
import ProfessorService from '@/services/api/professor/ProfessorService'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { LabelValue } from '@/commons/type'


export function TransactionForm() {
  const animatedComponents = makeAnimated();
  const { id } = useParams()
  const [transaction, setTransaction] = useState<Transaction>({
    value: 0,
    createdAt:'',
    updatedAt:'',
    user:'',
    type: 'DEPOSIT'
  })
  const [user, setUser] = useState<UserParams[]>([]);
  const [userSelected, setUserSelected] = useState<UserParams>();
  const [tipo, setTipo] = useState<LabelValue>();
  const [tipoSelected, setTipoSelected] = useState<LabelValue>();
  const [errors, setErrors] = useState({ id: null, value: '' })
  const [pendingApiCall, setPendingApiCall] = useState(false)
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate()

  const tipos:LabelValue[] = [
    { label: "Retirada", value: 'WITHDRAW' },
    { label: "Depósito", value: 'DEPOSIT' }
];

  const loadUsers = async () => {
    try {
      const response = await ProfessorService.findAll();
      if (response.data) {
        setUser(response.data);
        setApiError("");
      }
    } catch (error) {
      setApiError("Falha ao carregar usuários.");
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
    if (id) {
      TransactionService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setTransaction({
              id: response.data.id,
              value: response.data.value,
              createdAt: response.data.createdAt,
              updatedAt: response.data.updatedAt,
              user: response.data.user,
              type: response.data.type
            })
            setTipoSelected(tipos.find(tipo => tipo.value === response.data.type))
            setUserSelected(response.data.user)
            setApiError('')
          } else {
            setApiError('Falha ao carregar a transação')
          }
        })
        .catch((erro) => {
          setApiError('Falha ao carregar a transação')
        })
    }
  }, [id])

  const validationSchema = yup.object().shape({
    value: yup.string().required("Valor é obrigatório"),
  });

  const onSubmit = (values: Transaction) => {
    const data: Transaction = {
      ...values,
      id: transaction.id,
      value: values.value,
      createdAt: values.createdAt,
      updatedAt: values.updatedAt,
      user: userSelected,
      type: tipoSelected?.value
    }
    setPendingApiCall(true)
    if(transaction.id){
      TransactionService.update(data)
      .then((response) => {
        setPendingApiCall(false)
        navigate('/transaction')
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao atualizar a transação.')
        }
        setPendingApiCall(false)
      })
    }else{
    TransactionService.save(data)
      .then((response) => {
        setPendingApiCall(false)
        navigate('/transaction')
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors)
        } else {
          setApiError('Falha ao salvar a transação.')
        }
        setPendingApiCall(false)
      })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Transação</h1>
        <Formik
            initialValues={transaction}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <Field
                  as={TextField}
                  className={styles.textField}
                  label="Valor"
                  name="value"
                  error={touched.value && !!errors.value}
                  helperText={touched.value && errors.value}
                  fullWidth
                  required
                  variant="outlined"
                />
                <Select
                  name="user"
                  onChange={(optionsSelected: any) => {
                    setUserSelected(optionsSelected);
                  }}
                  className={styles.textField}
                  components={animatedComponents}
                  aria-label="Usuário"
                  placeholder="Usuário"
                  defaultValue={userSelected}
                  value={userSelected}
                  getOptionValue={(option: UserParams) => option.name}
                  getOptionLabel={(option: UserParams) => option.name}
                  options={user}
                  isSearchable={true}
                />
                <Select
                  name="type"
                  onChange={(optionsSelected: any) => {
                    setTipoSelected(optionsSelected);
                  }}
                  className={styles.textField}
                  components={animatedComponents}
                  aria-label="Tipo"
                  placeholder="Tipo"
                  defaultValue={tipoSelected}
                  value={tipoSelected}
                  getOptionValue={(option: any) => option.value}
                  getOptionLabel={(option: any) => option.label}
                  options={tipos}
                  isSearchable={true}
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
