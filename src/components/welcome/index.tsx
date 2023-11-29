import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Grid from '@mui/material/Grid'
import DashboardService from '@/services/api/dashboard/DashboardService'
import { GraficoDTO } from '@/commons/type'
import { toast } from 'react-hot-toast'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

export function Welcome() {
  const [graficoSolicitacao, setGraficoSolicitacao] = useState<GraficoDTO | any>({ titulo: '', datasets: [] })
  const [graficoSolicitacaoEquipamento, setGraficoSolicitacaoEquipamento] = useState<GraficoDTO | any>({ titulo: '', datasets: [] })
  const [graficoEquipamentoSituacao, setGraficoEquipamentoSituacao] = useState<GraficoDTO | any>({ titulo: '', datasets: [] })
  const [graficoUsuarioTipo, setGraficoUsuarioTipo] = useState<GraficoDTO | any>({ titulo: '', datasets: [] })
  const [graficoUsuarioSituacao, setGraficoUsuarioSituacao] = useState<GraficoDTO | any>({ titulo: '', datasets: [] })
  ChartJS.register(ArcElement, Tooltip, Legend)
  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }

  useEffect(() => {
    buscarDadoGraficoSolicitacao()
    buscarDadoGraficoSolicitacaoEquipamento()
    buscarDadoGraficoUsuarioSituacao()
    buscarDadoGraficoUsuarioTipo()
    buscarDadoGraficoEquipamentoSituacao()
  }, [])

  const buscarDadoGraficoSolicitacao = () => {
    DashboardService.getGraficoSolicitacao()
      .then((response) => {
        if (response) {
          setGraficoSolicitacao(response.data || [])
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.')
      })
  }

  const buscarDadoGraficoSolicitacaoEquipamento = () => {
    DashboardService.getGraficoSolicitacaoEquipamento()
      .then((response) => {
        if (response) {
          setGraficoSolicitacaoEquipamento(response.data || [])
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.')
      })
  }

  const buscarDadoGraficoUsuarioTipo = () => {
    DashboardService.getGraficoUsuarioTipo()
      .then((response) => {
        if (response) {
          setGraficoUsuarioTipo(response.data || [])
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.')
      })
  }

  const buscarDadoGraficoUsuarioSituacao = () => {
    DashboardService.getGraficoUsuarioSituacao()
      .then((response) => {
        if (response) {          
          setGraficoUsuarioSituacao(response.data || [])
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.')
      })
  }

  const buscarDadoGraficoEquipamentoSituacao = () => {
    DashboardService.getGraficoEquipamentoSituacao()
      .then((response) => {
        if (response) {
          setGraficoEquipamentoSituacao(response.data || [])
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.')
      })
  }

  return (
    <div className={styles.container}>
      <h1>SEJA BEM VINDO</h1>
      <Grid container justifyContent="center"
        alignItems="center" spacing={2}>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoSolicitacao?.datasets[0]?.data?.length > 0
              ? <><p className={styles.titulografico}>{graficoSolicitacao.titulo}</p>
                <Doughnut data={graficoSolicitacao} options={options} /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoSolicitacao.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoUsuarioTipo?.datasets[0]?.data?.length > 0
              ? <><p className={styles.titulografico}>{graficoUsuarioTipo.titulo}</p>
                <Doughnut data={graficoUsuarioTipo} options={options} /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoUsuarioTipo.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoEquipamentoSituacao?.datasets[0]?.data?.length > 0
              ? <><p className={styles.titulografico}>{graficoEquipamentoSituacao.titulo}</p>
              <Doughnut data={graficoEquipamentoSituacao} options={options} /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoEquipamentoSituacao.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoUsuarioSituacao?.datasets[0]?.data?.length > 0
              ? <><p className={styles.titulografico}>{graficoUsuarioSituacao.titulo}</p>
                <Doughnut data={graficoUsuarioSituacao} options={options} /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoUsuarioSituacao.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoSolicitacaoEquipamento?.datasets[0]?.data?.length > 0
              ? <><p className={styles.titulografico}>{graficoSolicitacaoEquipamento.titulo}</p>
                <Doughnut data={graficoSolicitacaoEquipamento} options={options} /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoSolicitacaoEquipamento.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
