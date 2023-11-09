import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss";
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import DashboardService from '@/services/api/dashboard/DashboardService';
import { GraficoDTO, } from '@/commons/type';
import { PieChartSlotComponentProps } from '@mui/x-charts/PieChart/PieChart';
import { cheerfulFiestaPalette } from '@mui/x-charts/colorPalettes';
import { toast } from 'react-hot-toast';

const marginProps = { top: 10, bottom: 10, left: 20, right: 20 };
const slotProp: PieChartSlotComponentProps = {
  legend: {
    itemMarkWidth: 20,
    itemMarkHeight: 9,
    markGap: 5,
    itemGap: 8,
    direction: 'row',
    position: { vertical: 'bottom', horizontal: 'middle' },
    padding: 20,
  },
}

export function Welcome() {
  const [graficoSolicitacao, setGraficoSolicitacao] = useState<GraficoDTO | any>({ titulo: '', dados: [] });
  const [graficoSolicitacaoEquipamento, setGraficoSolicitacaoEquipamento] = useState<GraficoDTO | any>({ titulo: '', dados: [] });
  const [graficoEquipamentoSituacao, setGraficoEquipamentoSituacao] = useState<GraficoDTO | any>({ titulo: '', dados: [] });
  const [graficoUsuarioTipo, setGraficoUsuarioTipo] = useState<GraficoDTO | any>({ titulo: '', dados: [] });
  const [graficoUsuarioSituacao, setGraficoUsuarioSituacao] = useState<GraficoDTO | any>({ titulo: '', dados: [] });


  useEffect(() => {
    buscarDadoGraficoSolicitacao();
    buscarDadoGraficoSolicitacaoEquipamento();
    buscarDadoGraficoUsuarioSituacao();
    buscarDadoGraficoUsuarioTipo();
    buscarDadoGraficoEquipamentoSituacao();
  }, []);

  const buscarDadoGraficoSolicitacao = () => {
    DashboardService.getGraficoSolicitacao()
      .then((response) => {
        if (response) {
          setGraficoSolicitacao(response.data || []);
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.');
      });
  }

  const buscarDadoGraficoSolicitacaoEquipamento = () => {
    DashboardService.getGraficoSolicitacaoEquipamento()
      .then((response) => {
        if (response) {
          setGraficoSolicitacaoEquipamento(response.data || []);
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.');
      });
  }

  const buscarDadoGraficoUsuarioTipo = () => {
    DashboardService.getGraficoUsuarioTipo()
      .then((response) => {
        if (response) {
          setGraficoUsuarioTipo(response.data || []);
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.');
      });
  }

  const buscarDadoGraficoUsuarioSituacao = () => {
    DashboardService.getGraficoUsuarioSituacao()
      .then((response) => {
        if (response) {
          setGraficoUsuarioSituacao(response.data || []);
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.');
      });
  }

  const buscarDadoGraficoEquipamentoSituacao = () => {
    DashboardService.getGraficoEquipamentoSituacao()
      .then((response) => {
        if (response) {
          setGraficoEquipamentoSituacao(response.data || []);
        }
      }).catch((error) => {
        toast.error('Não foi possível buscar dados do gráfico.');
      });
  }

  return (
    <div className={styles.container}>
      <h1>SEJA BEM VINDO</h1>
      <Grid container justifyContent="center"
        alignItems="center" spacing={2}>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoSolicitacao.dados.length > 0 ?
              <><p className={styles.titulografico}>{graficoSolicitacao.titulo}</p>
                <PieChart
                  title={graficoSolicitacao.titulo}
                  desc={graficoSolicitacao.titulo}
                  colors={cheerfulFiestaPalette}
                  series={[
                    {
                      data: graficoSolicitacao.dados,
                      innerRadius: 47,
                      outerRadius: 106,
                      paddingAngle: 2,
                      cornerRadius: 2,
                      startAngle: -180,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }
                  ]}
                  margin={marginProps}
                  slotProps={slotProp} /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoSolicitacao.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoUsuarioTipo.dados.length > 0 ?
              <><p className={styles.titulografico}>{graficoUsuarioTipo.titulo}</p>
                <PieChart
                  series={[
                    {
                      data: graficoUsuarioTipo.dados,
                      innerRadius: 47,
                      outerRadius: 106,
                      paddingAngle: 2,
                      cornerRadius: 2,
                      startAngle: -180,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }]}
                  margin={marginProps}
                  slotProps={slotProp}
                /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoUsuarioTipo.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoEquipamentoSituacao.dados.length > 0 ?
              <><p className={styles.titulografico}>{graficoEquipamentoSituacao.titulo}</p>
                <PieChart
                  series={[
                    {
                      data: graficoEquipamentoSituacao.dados,
                      innerRadius: 47,
                      outerRadius: 106,
                      paddingAngle: 2,
                      cornerRadius: 2,
                      startAngle: -180,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }]}
                  margin={marginProps}
                  slotProps={slotProp}
                /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoEquipamentoSituacao.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoUsuarioSituacao.dados.length > 0 ?
              <><p className={styles.titulografico}>{graficoUsuarioSituacao.titulo}</p>
                <PieChart
                  series={[
                    {
                      data: graficoUsuarioSituacao.dados,
                      innerRadius: 47,
                      outerRadius: 106,
                      paddingAngle: 2,
                      cornerRadius: 2,
                      startAngle: -180,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }]}
                  margin={marginProps}
                  slotProps={slotProp}
                /></>
              : <div className={styles.containervazio}>
                <p className={styles.titulovazio}>{graficoUsuarioSituacao.titulo}</p>
                <span style={{ height: 200 }}>Não há informações a serem exibidas.</span>
              </div>
            }
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={5}>
          <div className={styles.containergrafico}>
            {graficoSolicitacaoEquipamento.dados.length > 0 ?
              <><p className={styles.titulografico}>{graficoSolicitacaoEquipamento.titulo}</p>
                <PieChart
                  series={[
                    {
                      data: graficoSolicitacaoEquipamento.dados,
                      innerRadius: 47,
                      outerRadius: 106,
                      paddingAngle: 2,
                      cornerRadius: 2,
                      startAngle: -180,
                      endAngle: 180,
                      cx: 150,
                      cy: 150,
                    }]}
                  margin={marginProps}
                  slotProps={slotProp}
                /></>
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