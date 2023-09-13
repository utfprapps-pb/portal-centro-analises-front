import { useEffect, useState } from "react";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";

import PartnerService from "../../../services/api/partner/service";

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
import { Partner } from "../model/partner";

export function PartnerList() {
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

  const listHeader = [
    { label: "Código", value: "id" },
    { label: "Nome", value: "name" },
  ];

  const handleSearchChange = (value: string) => {
    setSearch(value !== "" ? value : "");
  };

  useEffect(() => {
    loadData(0);
  }, [search, orderBy, asc]);

  const loadData = (page: number) => {
    if (search && search.length) {
      PartnerService.search(page, rowsPerPage, orderBy, asc, search)
        .then((response) => {
          setTotal(response.data.totalElements);
          setPages(response.data.totalPages);
          setData(response.data.content);
          setApiError("");
        })
        .catch((error) => {
          setApiError("Falha ao carregar a lista de instituições parceiras");
        });
    } else {
      PartnerService.page(page, rowsPerPage, orderBy, asc)
        .then((response) => {
          setTotal(response.data.totalElements);
          setPages(response.data.totalPages);
          setData(response.data.content);
          setApiError("");
        })
        .catch((error) => {
          setApiError("Falha ao carregar a lista de instituições parceiras");
        });
    }
  };

  const onEdit = (url: string) => {
    navigate(url);
  };

  const onRemove = (id: number) => {
    PartnerService.remove(id)
      .then((response) => {
        loadData(0);
        setApiError("");
      })
      .catch((erro) => {
        setApiError("Falha ao remover a instituição parceira");
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
            onEdit("/partner/new");
          }}
        >
          Inserir
        </Button>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#3f51b5", color: "#ffffff" }}>
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
            {data.map((row: Partner) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => {
                      onEdit(`/partner/${row.id}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    aria-label="delete"
                    onClick={() => {
                      onRemove(row.id ? row.id : 0);
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
    </>
  );
}
