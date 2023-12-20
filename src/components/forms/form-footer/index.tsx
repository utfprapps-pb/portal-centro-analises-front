import React from 'react'
import { CustomButton } from '@/components'
import styles from "./styles.module.scss";

export interface FormFooterProps {
  loading: boolean;
}

export const FormFooter: React.FC<FormFooterProps> = (props: FormFooterProps) => (
  <>
    <div className={styles.term_box}>
      <p>
        Ao clicar em SOLICITAR, você concorda com nossos <a className={styles.link}>Termos</a> e <a className={styles.link}>Política de Privacidade</a>.
      </p>
    </div>
    <div className={styles.button_box}>
      <CustomButton
        text={props.loading ? 'ENVIANDO...' : 'SOLICITAR'}
        padding="1rem"
        textColor="white"
        backgroundColor="#006dac"
        textColorHover="white"
        backgroundColorHover="#00bbff"
        letterSpacing="4px"
        fontSize="16px"
        fontWeight="400"
        type="submit"
        disabled={props.loading}
      />
    </div>
  </>
)