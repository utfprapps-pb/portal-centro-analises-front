import styled, { css } from 'styled-components'

export const Container = styled.div<{ disabled: boolean }>`
  .MuiInputAdornment-root.MuiInputAdornment-positionStart {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    width: 100%;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      .MuiChip-deleteIcon {
        display: none;
      }
    `}
`
