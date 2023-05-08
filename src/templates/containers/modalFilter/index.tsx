import React from 'react'

import * as S from './styles'
import { ModalFilterProps } from './types'
import { Button, InputGroup, Text } from '@/components'

export const ModalFilterContainer: React.FC<ModalFilterProps> = ({
  children,
  apply,
  cancel
}) => (
  <S.Overlay>
    <S.Triangle />
    <S.Container>
      <S.Header>
        <Text size="h6" color="text">
          FILTROS
        </Text>
      </S.Header>
      <S.Content>{children}</S.Content>
      <InputGroup>
        <Button variant="outlined" onClick={cancel}>
          Cancelar
        </Button>
        <Button onClick={apply}>Aplicar</Button>
      </InputGroup>
    </S.Container>
  </S.Overlay>
)
