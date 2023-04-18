import React from 'react'

import * as S from './styles'
import { buttonThemes } from './theme'
import { ButtonProps } from './types'

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  icon,
  theme = 'primary',
  disabled = false,
  type = 'button',
  sizeButton = 'large',
  fullWidth = false,
  onClick = () => null
}) => {
  const buttonTheme = buttonThemes[theme]

  return (
    <S.Container buttonTheme={buttonTheme}>
      <S.Button
        variant={variant}
        startIcon={icon}
        size={sizeButton === 'medium' ? 'medium' : 'large'}
        color={buttonTheme.materialUiColor}
        type={type}
        disabled={disabled}
        fullWidth={fullWidth}
        onClick={onClick}
      >
        {children}
      </S.Button>
    </S.Container>
  )
}
