import React from 'react'

import * as S from './styles'
import { FormContainerProps } from './types'
import { Button, Text } from '@/components'

export * from './types'

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  title,
  submitButtonText,
  loading,
  onSubmit
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit()
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <Text size="h5" color="text">
        {title}
      </Text>

      <S.FormBody>{children}</S.FormBody>

      <Button type="submit" disabled={loading} loading={loading}>
        {submitButtonText}
      </Button>
    </S.Form>
  )
}
