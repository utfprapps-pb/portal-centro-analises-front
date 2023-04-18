import { TextField } from '@material-ui/core'
import styled from 'styled-components'

import { Text } from '../../text'
import { lighten } from '@/utils'

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  *::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  *::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const Label = styled(Text)`
  color: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.2 })};
`

export const Input = styled(TextField)``
