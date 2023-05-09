import React from 'react'
import styles from "./styles.module.scss";
import { AuthContainerTemplateProps } from './types'
import { Text } from '@/components'

export const AuthContainerTemplate: React.FC<AuthContainerTemplateProps> = ({
  title,
  description,
  body,
  footer,
  handleSubmit
}) => (
  <section className={styles.container}>
    <form
      className={styles.form_box}
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <div className={styles.form_body}>
        <Text>
          {title}
        </Text>

        <Text>
          {description}
        </Text>
      </div>

      <div className={styles.form_body}>{body}</div>

      <div className={styles.form_footer}>{footer}</div>
    </form>
  </section>
)
