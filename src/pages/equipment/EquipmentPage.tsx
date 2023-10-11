import {
  EditRounded,
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded
} from '@material-ui/icons'
import {
  Button,
  Grid,
  IconButton,
  TableFooter,
  TablePagination,
  TableSortLabel
} from '@mui/material'
import Paper from '@mui/material/Paper'
import styles from './styles.module.scss'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledTableCell } from '@/layouts/StyldeTableCell'
import { StyledTableRow } from '@/layouts/StyledTableRow'
import { EquipmentParams } from '@/services/api/equipment/equipment.type'
import EquipmentService from '@/services/api/equipment/EquipmentService'
import { Header, Menu } from '@/components'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import Breadcrumb from '@/components/breadcrumb'

export const EquipmentsPage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<EquipmentParams[]>([])
  const [apiError, setApiError] = useState('')

  const [page, setPage] = useState(0)
  const rowsPerPage = 10
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)
  const [status, setStatus] = useState(true)

  const [orderBy, setOrderBy] = useState('id')
  const [asc, setAsc] = useState(true)

  const listHeader = [
    { label: 'Código', value: 'id' },
    { label: 'Nome', value: 'name' },
    { label: 'Short name', value: 'shortName' },
    { label: '$/h UTFPR', value: 'valueHourUtfpr' },
    { label: '$/h Parceiro', value: 'valueHourPartner' },
    { label: '$/h Externo', value: 'valueHourPfPj' },
    { label: '$/amostra UTFPR', value: 'valueSampleUtfpr' },
    { label: '$/amostra Parceiro', value: 'valueSamplePartner' },
    { label: '$/amostra Externo', value: 'valueSamplePfPj' }
  ]

  const loadData = (page: number) => {
    EquipmentService.pageStatus(page, rowsPerPage, orderBy, asc, status)
      .then((response) => {
        setData(response.data.content)
        setTotal(response.data.totalElements)
        setPages(response.data.totalPages)
        setApiError('')
      })
      .catch((responseError: any) => {
        toast.error('Falha ao carregar lista de equipamentos')
        console.log(responseError)
      })
  }

  useEffect(() => {
    loadData(0)
  }, [status, orderBy, asc])

  //modificar este para chamar o inativar equipamento
  const removeEquipment = (id: number) => {
    EquipmentService.remove(id)
      .then((response) => {
        toast.success('Inativado com sucesso')
        handleChangePage(null, 0)
      })
      .catch((responseError) => {
        toast.error('Falha ao deixar o equipamento inativo.')
        console.log(responseError)
      })
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
    loadData(newPage)
  }

  //carrega a lista de usuários inativos no front
  function showInactive() {
    setStatus(false)
  }

  function showActive() {
    setStatus(true)
  }

  //chama a função que torna os equipamentos inativos em
  //ativos novamente
  const activeSelectedEquipment = (id: number) => {
    EquipmentService.activeEquipmentById(id)
      .then((response) => {
        toast.success('Ativado com sucesso')
        loadData(0)
      })
      .catch((responseError) => {
        toast.error('Falha ao deixar o equipamento ativo.')
        console.log(responseError)
      })
  }

  const handleSort = (id: any) => {
    setOrderBy(id)
    setAsc(!asc)
  }

  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.middle}>
        <Header />

        <Breadcrumb />

        <div>
          <Grid container justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{ m: 1 }}
              className={styles.buttonColor}
              onClick={() => navigate('/equipamento/form')}
            >
              Inserir
            </Button>

            <Button
              color="secondary"
              onClick={() => showInactive()}
              variant="outlined"
              sx={{ m: 1 }}
            >
              Inativos
            </Button>

            <Button
              color="secondary"
              onClick={() => showActive()}
              variant="outlined"
              sx={{ m: 1 }}
            >
              Ativos
            </Button>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {listHeader.map((head) => (
                    <StyledTableCell key={head.value}>
                      {head.label}
                      <TableSortLabel
                        active={orderBy === head.value}
                        direction={asc ? 'asc' : 'desc'}
                        onClick={() => handleSort(head.value)}
                      ></TableSortLabel>
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((e) => (
                  <StyledTableRow key={e.id}>
                    <StyledTableCell scope="row">{e.id}</StyledTableCell>
                    <StyledTableCell align="left">{e.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {e.shortName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueHourUtfpr?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueHourPartner?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueHourPfPj?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueSampleUtfpr?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueSamplePartner?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {e.valueSamplePfPj?.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </StyledTableCell>

                    <StyledTableCell
                      align="center"
                      style={{ paddingInline: 5! }}
                      width={150}
                    >
                      <IconButton aria-label="editar" color="info">
                        <EditRounded
                          onClick={() => navigate(`/equipamento/form/${e.id!}`)}
                        />
                      </IconButton>

                      <IconButton aria-label="deixar ativo" color="success">
                        <AddCircleOutlineRounded
                          onClick={() => activeSelectedEquipment(e.id!)}
                        />
                      </IconButton>

                      <IconButton aria-label="deixar inativo" color="error">
                        <RemoveCircleOutlineRounded
                          onClick={() => removeEquipment(e.id!)}
                        />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    labelDisplayedRows={({ from, to, count }) =>
                      `${from}-${to} de ${count}`
                    }
                    colSpan={4}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[10]}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page'
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
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
  )
}
