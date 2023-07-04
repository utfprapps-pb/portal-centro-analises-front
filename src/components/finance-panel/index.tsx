import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from 'formik'
import { CustomErrorMessage } from '../error-message'
import * as yup from "yup";
import { CustomButton } from '../custom-button';
import Dropdown from '../dropdown';
import { api } from '@/libs/axiosBase';
import { EditFinance, EditUser } from '@/commons/type';
import DropdownMov from '../dropdownmov';
import { useSubmit } from 'react-router-dom';

export function FinancePanel() {

    const [activePage, setActivePage] = useState(0);

    const [user, setUser] = useState<EditUser | undefined>();
    const [finance, setFinance] = useState<EditFinance | undefined>();
  
    const [page, setPage] = useState<any>({
      content: [],
      first: true,
      last: true,
      number: 0,
      totalElements: 0,
      totalPages: 0
    });
  
    useEffect(() => {
      api.get("/users/role/PROFESSOR")
        .then(response => {
          const data = response.data;
          setPage((state: any) => ({
            ...state,
            content: data
          }));
        })
    }, [activePage]);
  
    const changePage = (index: number) => {
      setActivePage(index);
    }
  
    function getUser(selected: EditUser): void | undefined {
      setUser(selected);
    }
  


    const handleValue = (value : string) => {
      let updatedFinance = { ...finance };
      updatedFinance.value = value;
      setFinance(updatedFinance);
    }

    const handleDesc = (desc : string) => {
      let updatedFinance = { ...finance };
      updatedFinance.description = desc;
      setFinance(updatedFinance);
    }
  
    const handleTypeChange = (selectedValue: number) => {
      let updatedFinance = {
        value: finance?.value,
        type: selectedValue,
        description: finance?.description,
        user: user,
      };

      setFinance(updatedFinance);
    };
  
    const [isLoading, setIsLoading] = useState(false);
  
    const validationForm = yup.object().shape({
      name: yup.string(),
      cargo: yup.string().required("Informe o tipo de transação"),
    });
  
    async function handleClickForm(values: {
      nome: string;
      type: string;
      valor: string;
      descricao: string;
    }) {
      const { nome, type, valor, descricao } = values;
      debugger;

      let updatedFinance = { ...finance };
      updatedFinance.user = {
          id: user!.id,
          displayName: '',
          email: '',
          password: '',
          role: '',
      };

      updatedFinance.description = descricao;
      updatedFinance.value = valor;

      if (updatedFinance != null && updatedFinance.user != null 
          && updatedFinance.type != null && updatedFinance.value != null) {
        api.post(`transaction`, {
          "value": updatedFinance.value,
          "user": {
              "id": updatedFinance.user.id
          },
          "type": updatedFinance.type,
          "description": updatedFinance.description
      }).then((response) => {
          window.location.reload();
        });
      }
    }
  
    return (
      <>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <><div className={styles.inputs_box}>
            <div className={styles.container}>
              <h1 className={styles.title}>PAINEL FINANCEIRO</h1>
              <div>
                <Formik
                  initialValues={{
                    nome: '',
                    type: "",
                    valor: "",
                    descricao: "",
                  }}
                  onSubmit={handleClickForm}
                  validationSchema={validationForm}
                >
                  <Form className={styles.inputs_container}>
                    <div className={styles.inputs_box}>
                      <div className={styles.row_box}>
                        <div className={styles.field_box}>
                          <p>Nome</p>
                          <div className={styles.input_box}>
                            <ErrorMessage
                              component={CustomErrorMessage}
                              name="nome"
                              className={styles.form_error} />
                            <Field
                              name="nome"
                              disabled
                              value={user?.name ?? ''}
                              placeholder=''
                              className={styles.input_form} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.row_box}>
                        <div className={styles.field_box}>
                          <div className={styles.field_box}>
                            <p>Movimentação</p>
                            <DropdownMov value={0} onChange={handleTypeChange} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.row_box}>
                        <div className={styles.field_box}>
                          <p>Valor</p>
                          <div className={styles.input_box}>
                            <ErrorMessage
                              component={CustomErrorMessage}
                              name="valor"
                              className={styles.form_error} />
                            <Field
                              name="valor"
                              placeholder=''
                              className={styles.input_form} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.row_box}>
                        <div className={styles.field_box}>
                          <p>Descrição</p>
                          <div className={styles.input_box}>
                            <ErrorMessage
                              component={CustomErrorMessage}
                              name="description"
                              className={styles.form_error} />
                            <Field
                              name="description"
                              placeholder=''
                              value={finance?.description}
                              className={styles.input_form} />
                          </div>
                        </div>
                      </div>
                      <div className={styles.button_box}>
                        <CustomButton
                          text="CONFIRMAR"
                          padding="1rem"
                          textColor="white"
                          backgroundColor="#006dac"
                          textColorHover="white"
                          backgroundColorHover="#00bbff"
                          letterSpacing="4px"
                          fontSize="16px"
                          fontWeight="400"
                          type="submit" />
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
            <div className="table-responsive">
              <table className={styles.tableAdmin}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Email</th>
                    <th>Seleção</th>
                  </tr>
                </thead>
                <tbody>
                  {page.content?.map((user: any) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>
                      <td><CustomButton
                        onClick={() => getUser(user)}
                        text="Selecionar"
                        padding="0.5rem"
                        textColor="white"
                        backgroundColor="#006dac"
                        textColorHover="white"
                        backgroundColorHover="#00bbff"
                        letterSpacing="4px"
                        fontSize="12px"
                        fontWeight="200"
                        type="submit"
                      /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    )
}
  