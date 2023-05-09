import React, { useState, useEffect } from 'react'
import styles from "./styles.module.scss";

export function Welcome() {
  return(
    <div className={styles.container}>
      <h1>SEJA BEM VINDO</h1>
    </div>
  )
}