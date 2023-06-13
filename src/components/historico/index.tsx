import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { CustomStatus, DownloadFile } from '@/components'
import { api } from "../../libs/axiosBase";
import { SolicitationAudit } from "@/commons/type";

export function Historico() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<SolicitationAudit>();
  
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
  
  return (
    <>
    {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>HISTÓRICO</h1>
          {Array.isArray(history) && history.map(({ id, newStatus, changeDate, solicitation, fileUrl } : any) => {
            const date = new Date(changeDate);
            const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          
            return (            
              <div key={id} className={styles.history_box}>
                <div  className={styles.content_left}>
                  <div>
                    <CustomStatus
                      text={
                        newStatus == 'PENDING_ADVISOR' ? 'Aguardando Confirmação' :
                        newStatus == 'PENDING_LAB' ? 'Aguardando Confirmação' :
                        newStatus == 'PENDING_SAMPLE' ? 'Aguardando Amostra' :
                        newStatus == 'APPROVED' ? 'Aguardando Análise' :
                        newStatus == 'PENDING_PAYMENT' ? 'Aguardando Pagamento' :
                        newStatus == 'REFUSED' ? 'Recusado' :
                        newStatus == 'FINISHED' ? 'Concluído' :
                        '#000000'
                      }
                      padding="0.5rem"
                      textColor="white"
                      backgroundColor={
                        newStatus == 'FINISHED' ? '#00d400' :
                        newStatus == 'PENDING_LAB' ? '#d49f00' :
                        newStatus == 'PENDING_ADVISOR' ? '#d49f00' :
                        newStatus == 'PENDING_SAMPLE' ? '#d49f00' :
                        newStatus == 'PENDING_PAYMEN' ? '#d49f00' :
                        newStatus == 'APPROVED' ? '#d49f00' :
                        '#000000'
                      }
                      width="160px"
                      letterSpacing="0px"
                      fontSize="12px"
                      fontWeight="300"
                    />
                  </div>
                  <h2 className={styles.text_box}>{formattedDate}</h2>
                  <h2 className={styles.text_box}>{solicitation.equipment.form}</h2>
                  <h2 className={styles.text_box}>R$ {}</h2>
                  <h2 className={styles.text_box}>{solicitation.createdBy.name}</h2>
                  <h2 className={styles.text_box}>{solicitation.project.description}</h2>
                </div>    
                {newStatus == 'FINISHED' && 
                  <DownloadFile 
                    url={fileUrl}
                    type="submit"
                    onClick={getFile}
                  />
                }
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
