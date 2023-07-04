import { EditRounded, DeleteRounded } from "@material-ui/icons";
import { Button, Grid, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import styles from "./styles.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTableCell } from "@/layouts/StyldeTableCell";
import { StyledTableRow } from "@/layouts/StyledTableRow";
import { EquipmentParams } from "@/services/api/equipment/equipment.type";
import EquipmentService from "@/services/api/equipment/EquipmentService";
import { Header, Menu } from "@/components";

export const EquipmentsPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<EquipmentParams[]>([]);

  const loadData = async () => {
    try {
      const response = await EquipmentService.findAll();

      if (response.data) {
        setData(response.data);
      }
    } catch (error) {
      toast.error("Falha ao carregar lista de equipamentos");
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const removeEquipment = (id: number) => {
    EquipmentService.remove(id)
      .then((response) => {
        toast.success("Removido com sucesso");
        loadData();
      })
      .catch((responseError) => {
        toast.error("Falha ao remover projeto.");
        console.log(responseError);
      });
  };

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.middle}>
        <Header />

        <div>
          <Grid container justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              className={styles.buttonColor}
              onClick={() => navigate("/equipamento/form")}
            >
              Inserir
            </Button>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell align="left">Nome</StyledTableCell>
                  <StyledTableCell align="center">$/h UTFPR </StyledTableCell>
                  <StyledTableCell align="center">
                    $/h Parceiro{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">$/h Externo </StyledTableCell>
                  <StyledTableCell align="center">
                    $/amostra UTFPR{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    $/amostra Parceiro{" "}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    $/amostra Externo{" "}
                  </StyledTableCell>
                  <StyledTableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((e) => (
                  <StyledTableRow key={e.id}>
                    <StyledTableCell component="th" scope="row">
                      {e.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{e.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueHourUtfpr?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueHourPartner?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueHourPfPj?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueSampleUtfpr?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueSamplePartner?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueSamplePfPj?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      style={{ paddingInline: 5! }}
                      width={90}
                    >
                      <IconButton aria-label="delete" color="info">
                        <EditRounded
                          onClick={() => navigate(`/equipamento/form/${e.id!}`)}
                        />
                      </IconButton>
                      <IconButton aria-label="delete" color="error">
                        <DeleteRounded onClick={() => removeEquipment(e.id!)} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data.length === 0 && (
            <div className={styles.container_white}>
              Nenhum dado para ser exibido
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
