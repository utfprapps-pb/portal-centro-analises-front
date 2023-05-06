import { TextField } from '@mui/material'
import { Check, WarningCircle } from 'phosphor-react'
import styled from 'styled-components'

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

export const InvalidIcon = styled(WarningCircle)`
  color: ${({ theme }) => theme.colors.error};
`

export const ValidIcon = styled(Check)`
  color: ${({ theme }) => theme.colors.success};
`
