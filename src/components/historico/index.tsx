/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react'
import styles from './styles.module.scss'
import { CustomStatus, DownloadFile } from '@/components'

export function Historico() {
  const history: any[] = [
      { id: 1, status: "Concluído", date: "2023-01-01", form: "GC-MS", value: 10.31, studentName: "Leonardo", projectName: "Projeto", fileUrl: "url" },
      { id: 2, status: "Aguardando confirmação", date: "2023-01-01", form: "GC-MS", value: 10.31, studentName: "Leonardo", projectName: "Projeto", fileUrl: "url" },
      { id: 3, status: "Aguardando pagamento", date: "2023-01-01", form: "GC-MS", value: 10.31, studentName: "Leonardo", projectName: "Projeto", fileUrl: "url" },
      { id: 4, status: "Aguardando análise", date: "2023-01-01", form: "GC-MS", value: 10.31, studentName: "Leonardo", projectName: "Projeto", fileUrl: "url" },
    ];
  
  function getHistory() {
    try {
      // CHAMADA DA API
      // history = [
      // ];
    } catch (error) {
      console.error("error", error);
    }
  }

  function getFile() {
    console.log("get-file");
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>HISTÓRICO</h1>
        {history.map(({ id, status, date, form, value, studentName, projectName, fileUrl }) => (
          <div key={id} className={styles.history_box}>
            <div  className={styles.content_left}>
              <div>
                <CustomStatus
                  text={status}
                  padding="0.5rem"
                  textColor="white"
                  backgroundColor={
                    status == 'Concluído' ? '#00d400' :
                    status == 'Aguardando confirmação' ? '#d49f00' :
                    status == 'Aguardando pagamento' ? '#d49f00' :
                    status == 'Aguardando análise' ? '#d49f00' :
                    '#000000'
                  }
                  width="160px"
                  letterSpacing="0px"
                  fontSize="12px"
                  fontWeight="300"
                />
              </div>
              <h2 className={styles.text_box}>{date}</h2>
              <h2 className={styles.text_box}>{form}</h2>
              <h2 className={styles.text_box}>R$ {value}</h2>
              <h2 className={styles.text_box}>{studentName}</h2>
              <h2 className={styles.text_box}>{projectName}</h2>
            </div>    
            {status == 'Concluído' && 
              <DownloadFile 
                url={fileUrl}
                type="submit"
                onClick={getFile}
              />
              
            }
          </div>
        ))}
    </div>
  )
}
