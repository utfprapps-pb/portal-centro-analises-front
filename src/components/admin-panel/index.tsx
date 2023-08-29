import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

import { api } from "@/libs/axiosBase";
import { EditUser } from "@/commons/type";
import Dropdown from "../dropdown";
import { CustomButton } from "../custom-button";
import { CustomErrorMessage } from "../error-message";
import styles from "./styles.module.scss";

export function AdminPanel() {
  const [activePage, setActivePage] = useState(0);
  const [user, setUser] = useState<EditUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState<any>({
    content: [],
    first: true,
    last: true,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const changePage = (index: number) => {
    setActivePage(index);
  };

  function getUser(selected: EditUser) {
    setUser(selected);
  }

  function updateSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      api
        .post(`admin/edit/role/${selected.id}`, selected.role)
        .then((response) => {
          window.location.reload();
        });
    }
  }

  function removeUserSelectedUser(selected: EditUser) {
    if (selected != null && selected.id != null) {
      api.delete("users/" + selected.id).then((response) => {
        window.location.reload();
      });
    }
  }

  const handleRoleChange = (selectedValue: string) => {
    setUser((userInformation) => {
      if (userInformation) {
        return {
          ...userInformation,
          role: selectedValue,
        };
      }

      return userInformation;
    });
  };

  const validationForm = yup.object().shape({
    name: yup.string(),
    cargo: yup.string().required("Informe o cargo"),
    email: yup.string(),
  });

  async function handleClickForm(values: {
    name: string;
    cargo: string;
    email: string;
    orientador: string;
  }) {
    try {
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    api.get("/users").then((response) => {
      const data = response.data;
      setPage((state: any) => ({
        ...state,
        content: data,
      }));
    });
  }, [activePage]);

  return (
    <>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className={styles.inputs_box}>
            <div className={styles.container}>
              <h1 className={styles.title}>PAINEL DO ADMINISTRADOR</h1>
              <div>
                <Formik
                  initialValues={{
                    name: "",
                    cargo: "",
                    orientador: "",
                    email: "",
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
                              className={styles.form_error}
                            />
                            <Field
                              name="nome"
                              disabled
                              value={user?.name ?? ""}
                              placeholder=""
                              className={styles.input_form}
                            />
                          </div>
                        </div>
                        <div className={styles.field_box}>
                          <p>Email</p>
                          <div className={styles.input_box}>
                            <ErrorMessage
                              component={CustomErrorMessage}
                              name="email"
                              className={styles.form_error}
                            />
                            <Field
                              name="email"
                              disabled
                              value={user?.email ?? ""}
                              placeholder=""
                              className={styles.input_form}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.row_box}>
                        <div className={styles.field_box}>
                          <div className={styles.field_box}>
                            <p>Cargo</p>
                            <Dropdown
                              value={user?.role || ""}
                              onChange={handleRoleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.button_box}>
                        <CustomButton
                          onClick={() => updateSelectedUser(user!)}
                          text="ATUALIZAR"
                          padding="1rem"
                          textColor="white"
                          backgroundColor="#006dac"
                          textColorHover="white"
                          backgroundColorHover="#00bbff"
                          letterSpacing="4px"
                          fontSize="16px"
                          fontWeight="400"
                          type="submit"
                        />
                      </div>
                      <div className={styles.button_box}>
                        <CustomButton
                          onClick={() => removeUserSelectedUser(user!)}
                          text="REMOVER"
                          padding="1rem"
                          textColor="white"
                          backgroundColor="#cc0000"
                          textColorHover="white"
                          backgroundColorHover="#ff4444"
                          letterSpacing="4px"
                          fontSize="16px"
                          fontWeight="400"
                          type="submit"
                        />
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
                    <td>
                      <CustomButton
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
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
