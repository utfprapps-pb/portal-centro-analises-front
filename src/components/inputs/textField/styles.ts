import { TextField } from '@material-ui/core'
import { Check, Error } from '@material-ui/icons'
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

export const Input = styled(TextField)``

export const InvalidIcon = styled(Error)`
  color: ${({ theme }) => theme.colors.error};
`

export const Label = styled(Text)`
  color: ${({ theme }) =>
    lighten({ color: theme.colors.black, percentage: 0.2 })};
`

export const ValidIcon = styled(Check)`
  color: ${({ theme }) => theme.colors.success};
`
