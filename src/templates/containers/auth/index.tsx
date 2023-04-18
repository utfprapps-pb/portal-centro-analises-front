import React from 'react'

import * as S from './styles'
import { AuthContainerTemplateProps } from './types'
import { Text } from '@/components'

export const AuthContainerTemplate: React.FC<AuthContainerTemplateProps> = ({
  title,
  description,
  body,
  footer,
  handleSubmit
}) => (
  <S.Container>
    <S.Form
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <S.FormHeader>
        <Text size="h5" color="black">
          {title}
        </Text>

        <Text size="b3" color="black">
          {description}
        </Text>
      </S.FormHeader>

      <S.FormBody>{body}</S.FormBody>

      <S.FormFooter>{footer}</S.FormFooter>
    </S.Form>
  </S.Container>
)
