import React from 'react'
import styles from "./styles.module.scss";

import { TypographyProps } from './types'

export const Typography: React.FC<TypographyProps> = ({
  children,
  onClick
}) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}
