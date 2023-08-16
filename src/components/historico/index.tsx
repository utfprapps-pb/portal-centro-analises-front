import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CustomStatus, DownloadFile } from '@/components'
import { api } from "../../libs/axiosBase";
import { SolicitationAudit } from "@/commons/type";
import _ from 'lodash';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'
import { IconButton } from '@mui/material'

export function Historico() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<SolicitationAudit>();

  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [selectedSolicitation, setSelectedSolicitation] = useState();

  function toggleDropdown(id: any) {
    setSelectedSolicitation(id);
    setMostrarDropdown(!mostrarDropdown);
  }
  
  function getFile() {
    console.log("get-file");
  }

  useEffect(() => {
		async function getHistory() {
				const historyList = await api.get("/audit");
        setHistory(historyList.data)
				setIsLoading(false);
			}
			getHistory();
  }, []);
  
  const gruposPorId = _.groupBy(history, 'solicitation.id'); // Agrupa os objetos internos pelo ID

  return (
    <>
    {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.container}>
          {Object.keys(gruposPorId).map((id) => {
           
            // const date = new Date(changeDate);
            // const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            // console.log(formattedDate)
            return (
              <div key={id} className={styles.history_box}>
                <div className={styles.content_left}>
                  {gruposPorId[id].map((objeto, index) => {
                    if (typeof objeto === 'object' && objeto.newStatus && objeto.id) {
                      if (index === gruposPorId[id].length - 1) {
                        const date2 = new Date(objeto.changeDate);
                        const formattedDate2 = `${date2.toLocaleDateString()} ${date2.toLocaleTimeString()}`;
                        return (
                          <>
                          <div className={styles.all_box}>
                          <div className={styles.box}>
                            <div>
                              <CustomStatus
                                text={
                                  objeto.newStatus == 'PENDING_ADVISOR' ? 'Aguardando Confirmação' :
                                  objeto.newStatus == 'PENDING_LAB' ? 'Aguardando Laboratório' :
                                  objeto.newStatus == 'PENDING_SAMPLE' ? 'Aguardando Amostra' :
                                  objeto.newStatus == 'APPROVED' ? 'Aguardando Análise' :
                                  objeto.newStatus == 'PENDING_PAYMENT' ? 'Aguardando Pagamento' :
                                  objeto.newStatus == 'REFUSED' ? 'Recusado' :
                                  objeto.newStatus == 'FINISHED' ? 'Concluído' :
                                  '#000000'
                                }
                                padding="0.5rem"
                                textColor="white"
                                backgroundColor={
                                  objeto.newStatus == 'FINISHED' ? '#00d400' :
                                  objeto.newStatus == 'PENDING_LAB' ? '#ff5e00' :
                                  objeto.newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                                  objeto.newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                                  objeto.newStatus == 'PENDING_PAYMENT' ? '#d49f00' :
                                  objeto.newStatus == 'APPROVED' ? '#d49f00' :
                                  '#000000'
                                }
                                width="160px"
                                letterSpacing="0px"
                                fontSize="12px"
                                fontWeight="300"
                                />
                              </div>
                              <h2 className={styles.text_box}>{formattedDate2}</h2>
                              <h2 className={styles.text_box}>{objeto.solicitation.equipment.name}</h2>
                              {objeto.value &&
                                <h2 className={styles.text_box}>R$ {objeto.value}</h2>
                              }
                              <h2 className={styles.text_box}>{objeto.solicitation.createdBy.name}</h2>
                              <h2 className={styles.text_box}>{objeto.solicitation.project.description}</h2>
                              {objeto.newStatus == 'FINISHED' && 
                                <DownloadFile 
                                  url={objeto.fileUrl}
                                  type="submit"
                                  onClick={getFile}
                                />
                              }
                              <button key={id} onClick={() => toggleDropdown(id)}>
                                {(mostrarDropdown && (selectedSolicitation===id)) ? <IconButton aria-label="approve" color="info"><ArrowUpward /></IconButton> : <IconButton aria-label="approve" color="info"><ArrowDownward /></IconButton> }
                              </button>
                              </div>
                              </div>
                              
                              {(mostrarDropdown && (selectedSolicitation===id)) && (
                                <div className={styles.dropdown}>
                                  {gruposPorId[id].map((objeto2, index2) => {
                                    if (index2 !== gruposPorId[id].length - 1) {
                                      if (typeof objeto2 === 'object' && objeto.id && objeto.newStatus) {
                                        const date = new Date(objeto2.changeDate);
                                        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                                        return (
                                          <>
                                          <div className={styles.dropwdown_inside}>
                                            <CustomStatus
                                              text={
                                                objeto2.newStatus == 'PENDING_ADVISOR' ? 'Aguardando Confirmação' :
                                                objeto2.newStatus == 'PENDING_LAB' ? 'Aguardando Laboratório' :
                                                objeto2.newStatus == 'PENDING_SAMPLE' ? 'Aguardando Amostra' :
                                                objeto2.newStatus == 'APPROVED' ? 'Aguardando Análise' :
                                                objeto2.newStatus == 'PENDING_PAYMENT' ? 'Aguardando Pagamento' :
                                                objeto2.newStatus == 'REFUSED' ? 'Recusado' :
                                                objeto2.newStatus == 'FINISHED' ? 'Concluído' :
                                                '#000000'
                                              }
                                              padding="0.5rem"
                                              textColor="white"
                                              backgroundColor={
                                                objeto2.newStatus == 'FINISHED' ? '#00d400' :
                                                objeto2.newStatus == 'PENDING_LAB' ? '#ff5e00' :
                                                objeto2.newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                                                objeto2.newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                                                objeto2.newStatus == 'PENDING_PAYMENT' ? '#d49f00' :
                                                objeto2.newStatus == 'APPROVED' ? '#d49f00' :
                                                '#000000'
                                              }
                                              width="160px"
                                              letterSpacing="0px"
                                              fontSize="12px"
                                              fontWeight="300"
                                              />
                                            <h2 className={styles.text_box}>{formattedDate}</h2>
                                            </div>
                                          </>
                                        );
                                      }
                                    }
                                    return null;
                                  })}
                                </div>
                              )}
                          </>
                        );
                      }
                    }
                  })}

                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
