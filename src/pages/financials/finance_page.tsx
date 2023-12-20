import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { ErrorMessage, Field, Form, Formik, validateYupSchema } from "formik";
import { CustomErrorMessage } from "../../components/error-message";
import * as yup from "yup";
import { CustomButton } from "../../components/custom-button";
import { api } from "@/libs/axiosBase";
import { EditFinance, EditUser, User } from "@/commons/type";
import DropdownMov from "../../components/dropdownmov";
import { useNavigate } from 'react-router-dom'
import { useLocation, useSubmit } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper, TableFooter, TablePagination, TableSortLabel } from '@mui/material';

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import UserService from '@/services/api/user/UserService';
import FinanceService from '@/services/api/finance/financeservice';

export const FinancePage: React.FC = () => {
  const [activePage, setActivePage] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

  const userSend = location.state?.user;

  const [user, setUser] = useState<User>();
  const [finance, setFinance] = useState<EditFinance>();

  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  const [orderBy, setOrderBy] = useState("id");
  const [asc, setAsc] = useState(true);

  const listHeader = [
    { label: "Código", value: "id" },
    { label: "Descrição", value: "description" },
    { label: "Valor", value: "value" },
  ];

  useEffect(() => {
    loadData(0)
  }, [orderBy, asc]);

  const loadData = (page: number) => {
    FinanceService.findByUserId(userSend.id).then((response) => {
      setData(response.data);
      setTotal(response.data.totalElements);
      setPages(response.data.totalPages);

      const value = response.data.reduce((accumulator, current) => {
        return accumulator + (current.value || 0);
      }, 0);

      setTotalValue(value)
      
    }).catch((responseError: any) => {
    })
  }

  const changePage = (index: number) => {
    setActivePage(index);
  };

  function getUser(selected: User): void | undefined {
    setUser(selected);
    handleClickOpen(selected);
  }

  const handleClickOpen = (selected: User) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    loadData(newPage)
  };

  const handleTypeChange = (selectedValue: number) => {
    setFinance((financeInformation) => {
      if (financeInformation && user) {
        return {
          ...financeInformation,
          type: selectedValue,
          user: user,
        };
      }

      return financeInformation;
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const validationForm = yup.object().shape({
    nome: yup.string(),
  });

  const handleClickForm = (values: any) => {
    const { nome, type, valor, description } = values;

    let updatedFinance = { ...finance };
    updatedFinance.user = {
      id: userSend!.id,
      displayName: "",
      email: "",
      password: "",
      role: "",
    };

    updatedFinance.type = type;
    updatedFinance.description = description;
    updatedFinance.value = valor;

    if (updatedFinance && updatedFinance.user
      && updatedFinance.type != null && updatedFinance.value) {
      FinanceService.save({
        "value": updatedFinance.value,
        "user": {
          "id": updatedFinance.user.id
        },
        "type": updatedFinance.type,
        "description": updatedFinance.description
      }).then((response) => {
        handleClose();
        handleChangePage(null, 0)
      });
    }
  }

  const handleSort = (id: any) => {
    setOrderBy(id);
    setAsc(!asc);
  }

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className={styles.inputs_box}>
            <div className={styles.container}>
              <Dialog open={open} onClose={handleClose} style={{ overflowY: 'visible' }}>
                <DialogTitle>Movimentação</DialogTitle>
                <DialogContent style={{ overflowY: 'visible' }}>
                  <Formik
                    initialValues={{
                      nome: "",
                      type: 0,
                      valor: "",
                      description: "",
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
                                value={user?.displayName ?? ''}
                                placeholder=''
                                className={styles.input_form} />
                            </div>
                          </div>

                          <div className={styles.field_box}>
                            <div className={styles.field_box}>
                              <p>Movimentação</p>
                              <DropdownMov nome={"nome"} value={0} onChange={handleTypeChange} />
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
                                className={styles.input_form} />
                            </div>
                          </div>
                        </div>
                        <div className={styles.row_box}>
                          <div className={styles.button_box}>
                            <CustomButton
                              onClick={() => handleClose()}
                              text="Cancelar"
                              padding="1rem"
                              textColor="white"
                              backgroundColor="#676767"
                              textColorHover="white"
                              backgroundColorHover="#9f9f9f"
                              letterSpacing="4px"
                              fontSize="16px"
                              fontWeight="400"
                              type="submit" />
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
                      </div>
                    </Form>
                  </Formik>
                </DialogContent>
              </Dialog>
              <h1 className={styles.title}>PAINEL FINANCEIRO - {userSend.name}</h1>
            </div>
          </div>
          <div className={styles.addButton}>
            <CustomButton
              onClick={() => getUser(userSend)}
              text="Adicionar"
              padding="0.5rem"
              textColor="white"
              backgroundColor="#006dac"
              textColorHover="white"
              backgroundColorHover="#00bbff"
              letterSpacing="4px"
              fontSize="12px"
              fontWeight="100"
              type="submit"
            />
          </div>
          <div className={styles.table}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {listHeader.map((head) => (
                      <StyledTableCell align={head.value==="id" ?"left":"center"} key={head.value}>{head.label}
                        <TableSortLabel active={orderBy === head.value}
                          direction={asc ? 'asc' : 'desc'}
                          onClick={() => handleSort(head.value)}
                        >
                        </TableSortLabel>
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  { data.map((finances: any) => (
                    <StyledTableRow key={finances.id}>
                      <StyledTableCell scope="row">
                        {finances.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">{finances.description}</StyledTableCell>
                      <StyledTableCell align="center">
                        {finances.value?.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <div className={styles.totalValue}>
                Valor Total: {totalValue?.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                              })}
              </div>
            </TableContainer>
          </div>
          <div className={styles.backButton}>
          <CustomButton
              onClick={() => navigate('/admin')}
              text="Voltar"
              padding="0.5rem"
              textColor="white"
              backgroundColor="#006dac"
              textColorHover="white"
              backgroundColorHover="#00bbff"
              letterSpacing="4px"
              fontSize="12px"
              fontWeight="100"
              type="submit"
            />
          </div>
        </>
      )}
    </>
  );
};
