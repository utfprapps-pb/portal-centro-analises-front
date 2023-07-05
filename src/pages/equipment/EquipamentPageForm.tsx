import styles from "./styles.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { TextField, Button, Paper, Box, Grid } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/contexts";
import { Header, Menu } from "@/components";
import { EquipmentParams } from "@/services/api/equipment/equipment.type";
import EquipmentService from "@/services/api/equipment/EquipmentService";

const validationSchema = Yup.object().shape({
  valueHourUtfpr: Yup.number(),
  valueHourPartner: Yup.number(),
  valueHourPfPj: Yup.number(),
  valueSampleUtfpr: Yup.number(),
  valueSamplePartner: Yup.number(),
  valueSamplePfPj: Yup.number(),
});

export const EquipmentPageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authenticatedUser } = useContext(AuthContext);

  const [nameDisable, setNameDisable] = useState<boolean>(false)
  const [equipment, setEquipment] = useState<EquipmentParams>({
    id: 0,
    name: "",
    valueHourUtfpr: undefined,
    valueHourPartner: undefined,
    valueHourPfPj: undefined,
    valueSampleUtfpr: undefined,
    valueSamplePartner: undefined,
    valueSamplePfPj: undefined,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await EquipmentService.findById(Number(id));

        if (response.data) {
          setEquipment({
            id: response.data.id,
            name: response.data.name ?? '',
            valueHourPartner: response.data.valueHourPartner ?? '',
            valueHourPfPj: response.data.valueHourPfPj ?? '',
            valueHourUtfpr: response.data.valueHourUtfpr ?? '',
            valueSamplePartner: response.data.valueSamplePartner ?? '',
            valueSamplePfPj: response.data.valueSamplePfPj ?? '',
            valueSampleUtfpr: response.data.valueSampleUtfpr ?? '',
          });
        }
      } catch (error) {
        toast.error("Fala ao carregar equipamento");
        console.log(error);
      }
    };

    if (id) {
      loadData();
      setNameDisable(true);
    }
  }, []);

  const handleSubmit = (values: EquipmentParams) => {
    const data: EquipmentParams = {
      ...values,
      id: equipment?.id!,
      name: values.name,
    };

    EquipmentService.save(data)
      .then((response) => {
        toast.success("Sucesso ao salvar o equipamento.");
        navigate("/equipamento");
      })
      .catch((error) => {
        toast.error("Falha ao salvar o equipamento.");
      });
  };

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.middle}>
        <Header />
        <Paper
          className={styles.containerForm}
          elevation={3}
          variant="outlined"
        >
          <Formik
            initialValues={equipment!}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ errors, touched }) => (
              <Form className={styles.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Nome"
                      name="name"
                      fullWidth
                      required
                      disabled={nameDisable}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Valor por hora UTFPR"
                      name="valueHourUtfpr"
                      fullWidth
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{ inputProps: { min: 0, step: "0.01" }, shrink: true }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Valor por hora PARCEIRO"
                      name="valueHourPartner"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Valor por hora EXTERNO"
                      name="valueHourPfPj"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Valor por amostra UTFPR"
                      name="valueSampleUtfpr"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Valor por amostra PARCEIRO"
                      name="valueSamplePartner"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Field
                      as={TextField}
                      className={styles.textField}
                      label="Valor por amostra EXTERNO"
                      name="valueSamplePfPj"
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, step: "0.01" } }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>

                  <Box className={styles.w100} m={2} pt={3}>
                    <Button
                      className={styles.w100}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Enviar
                    </Button>
                  </Box>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </div>
    </div>
  );
};
