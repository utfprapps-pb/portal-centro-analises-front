import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material'
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions'
import FinanceService from '@/services/api/finance/financeservice'
import { TransactionDTO } from '@/commons/type'
import { formatCurrencyBRL } from '@/utils/currency'

const listHeader = [
  { label: 'Description', value: 'description' },
  { label: 'Data', value: 'created_at' },
  { label: 'Tipo', value: 'type' },
  { label: 'Valor', value: 'value' },
  { label: 'Saldo Atualizado', value: 'currentBalance' }
]

const rowsPerPage = 10

export const TeacherFinances: React.FC = () => {
  const [orderBy, setOrderBy] = useState('id')
  const [asc, setAsc] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [data, setData] = useState<TransactionDTO[]>()

  const handleSort = (id: any) => {
    if (id !== 'id' && id === orderBy && !asc) {
      setOrderBy('id')
    } else {
      setOrderBy(id)
      setAsc(!asc)
    }
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
    loadData(newPage)
  }

  const loadData = (page: number) => {
    FinanceService.page(page, rowsPerPage, orderBy, asc).then((response) => {
      setTotal(response.data.totalElements)
      setData(response.data.content)
    })
  }

  useEffect(() => {
    loadData(0)
  }, [orderBy, asc])

  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {listHeader.map((head) => (
                <TableCell align="center" key={head.value}>
                  {head.label}
                  <TableSortLabel
                    active={orderBy === head.value}
                    direction={asc ? 'asc' : 'desc'}
                    onClick={() => {
                      handleSort(head.value)
                    }}
                  ></TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((transaction) => (
              <>
                <TableRow key={transaction.id}>
                  <TableCell scope="row">{transaction.description}</TableCell>

                  <TableCell scope="row">
                    {new Date(transaction.createdAt).toLocaleString('en-GB', {
                      timeZone: 'UTC'
                    })}
                  </TableCell>

                  <TableCell scope="row">{`${
                    transaction.type === 'DEPOSIT' ? 'Entrada' : 'Saída'
                  }`}</TableCell>
                  <TableCell scope="row">
                    {formatCurrencyBRL(transaction.value)}
                  </TableCell>
                  <TableCell scope="row">
                    {formatCurrencyBRL(transaction.currentBalance)}
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count}`
                }
                colSpan={5}
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
    </div>
  )
}
