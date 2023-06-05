import React, { useContext } from 'react'
import styles from "./styles.module.scss";
import { AuthContext } from '@/contexts';

export function Header() {
  const { authenticatedUser} = useContext(AuthContext);

  return (
    <div className={styles.container}>
      <h2>Seja bem vindo, {authenticatedUser?.displayName}</h2>
    </div>
  )
}