import { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TableCell from "@material-ui/core/TableCell";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss";
import { Button, Grid, TableFooter, TablePagination, TableSortLabel } from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import { FilterDrawer } from "@/components/filter-drawer";
import { DomainRole } from '../model/domain-role';
import DomainRoleService from "@/services/api/domain-role/service";
import { ROLE_OPTIONS } from '../../../commons/roles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function DomainRoleList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const rowsPerPage = 10;
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState<string>("");

  const [orderBy, setOrderBy] = useState("id");
  const [asc, setAsc] = useState(true);

  // Métodos teste do dialog sim e não
  const [rowBeingDeleted, setRowBeingDeleted] = useState<DomainRole>();
  const [openNoYesDialog, setOpenNoYesDialog] = useState(false);
  const handleNoYesDialogClose = () => {
    setOpenNoYesDialog(false);
  };
  const onNoClick = () => {
    handleNoYesDialogClose();
  };
  const onYesClick = () => {
    if (rowBeingDeleted) {
      onRemove(rowBeingDeleted.id ? rowBeingDeleted.id : 0);
      handleNoYesDialogClose();
    }
  };

  const listHeader = [
    { label: "Código", value: "id" },
    { label: "Domínio", value: "domain" },
    { label: "Permissão", value: "role" },
  ];

  const handleSearchChange = (value: string) => {
    setSearch(value !== "" ? value : "");
  };

  useEffect(() => {
    loadData(0);
  }, [search, orderBy, asc]);

  const loadData = (page: number) => {
    if (search?.length) {
      DomainRoleService.search(page, rowsPerPage, orderBy, asc, search)
        .then((response) => {
          setTotal(response.data.totalElements);
          setPages(response.data.totalPages);
          setData(response.data.content);
          setApiError("");
        })
        .catch((error) => {
          setApiError("Falha ao carregar a lista de domínios.");
        });
    } else {
      DomainRoleService.page(page, rowsPerPage, orderBy, asc)
        .then((response) => {
          setTotal(response.data.totalElements);
          setPages(response.data.totalPages);
          setData(response.data.content);
          setApiError("");
        })
        .catch((error) => {
          setApiError("Falha ao carregar a lista de domínios.");
        });
    }
  };

  const onEdit = (url: string) => {
    navigate(url);
  };

  const onRemove = (id: number) => {
    DomainRoleService.remove(id)
      .then((response) => {
        loadData(0);
        setApiError("");
      })
      .catch((erro) => {
        setApiError("Falha ao remover domínio.");
      });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    loadData(newPage);
  };

  const handleSort = (id: any) => {
    setOrderBy(id);
    setAsc(!asc);
  }

  return (
    <>
      <Grid container justifyContent="space-between">
        <FilterDrawer list={listHeader} handleSearchChange={handleSearchChange} />
        <Button
          variant="outlined"
          className={styles.buttoncolor}
          onClick={() => {
            onEdit("/domain-role/new");
          }}
        >
          Inserir
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {listHeader.map((head) => (
                <TableCell key={head.value}>{head.label}
                  <TableSortLabel active={orderBy === head.value}
                    direction={asc ? 'asc' : 'desc'}
                    onClick={() => handleSort(head.value)}
                  >
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: DomainRole) => (
              <TableRow
                key={row.domain}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{
                  ROLE_OPTIONS.map((role) => {
                    if (role.value == row.role)
                      return role.label;
                  })}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => {
                      onEdit(`/domain-role/${row.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      setRowBeingDeleted(row);
                      setOpenNoYesDialog(true);
                      // onRemove(row.id ? row.id : 0);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                colSpan={3}
                count={total}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10]}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Dialog com as opções Não e Sim (https://mui.com/material-ui/react-dialog) */}
      <Dialog
        open={openNoYesDialog}
        onClose={handleNoYesDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja mesmo excluir o registro?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa ação não poderá ser revertida.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onNoClick} autoFocus>Não</Button>
          <Button onClick={onYesClick}>Sim</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
