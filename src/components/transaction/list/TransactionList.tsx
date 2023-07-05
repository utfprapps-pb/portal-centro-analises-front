import { useContext, useEffect, useState } from 'react'

import TransactionService from '../../../services/api/transaction/TransactionService'
import {Transaction} from '../model/transaction'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import TableCell from '@material-ui/core/TableCell'

import { useNavigate } from "react-router-dom"

import styles from './styles.module.scss'
import { Button, Grid } from '@material-ui/core'
import { AuthContext } from '@/contexts'
import ProfessorService from '@/services/api/professor/ProfessorService'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export function TransactionList() {

  const { authenticatedUser } = useContext(AuthContext);

  const [data, setData] = useState([])
  const [apiError, setApiError] = useState('')
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [view, setView] = useState(false);

  useEffect(() => {
    if(authenticatedUser?.role === 'PROFESSOR'){
      loadBalance(authenticatedUser?.id)
    }
    loadData()
  },[balance])

  const loadBalance = (id:number) => {
    ProfessorService.findProfessorById(id)
    .then((response) => {
      setBalance(response.data.balance)      
      setApiError('')
    })
    .catch((error) => {
      setApiError('Falha ao carregar professor')
    })
  }
  const loadData = () => {
      TransactionService.findAll()
      .then((response) => {
        setData(response.data)
        setApiError('')
      })
      .catch((error) => {
        setApiError('Falha ao carregar a lista de transações')
      })
  }

  const onNew = (url: string) => {
    navigate(url);
  };

  const formatDate = (date:any) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
    return formattedDate;
  }

  return (
      <>
      <Grid container justifyContent="space-between">
      {authenticatedUser?.role === 'ADMIN' &&
        <Button
          variant="contained"
          className={styles.buttoncolor}
          onClick={() => { onNew('/transaction/new') } }
          >
          Inserir
        </Button>}
        {authenticatedUser?.role === 'PROFESSOR' &&
        <Button 
        onClick={() => setView(!view)}
          variant="contained" 
          endIcon={ view ? <VisibilityOffIcon /> : <VisibilityIcon />}
          className={styles.buttoncolor}>
          { view ? `Seu saldo R$: ${balance}` : 'Visualizar saldo' }
        </Button>
        }
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#3f51b5', color: '#ffffff' }}>
              <TableCell>Código</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Criação</TableCell>
              <TableCell>Professor</TableCell>
              <TableCell>Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: Transaction) => (              
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row?.createdAt ? formatDate(row?.createdAt) : ''}</TableCell>
                <TableCell>{row.user.name}</TableCell>
                <TableCell>{row.type === 'DEPOSIT' ? 'Depósito' : 'Retirada'}</TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <div className={styles.container_white}>
                Nenhum dado para ser exibido
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
