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
  onClick = () => null
}) => {
  const buttonTheme = buttonThemes[theme]

  return (
    <S.Button
      buttontheme={buttonTheme}
      variant={variant}
      startIcon={icon}
      size={sizeButton === 'medium' ? 'medium' : 'large'}
      color={buttonTheme.materialUiColor}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </S.Button>
  )
}
