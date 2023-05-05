import React from 'react'

import * as S from './styles'
import { buttonThemes } from './theme'
import { ButtonProps } from './types'
import { Loading } from '@/components'

export * from './types'

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  icon,
  theme = 'primary',
  disabled = false,
  type = 'button',
  sizeButton = 'large',
  loading = false,
  onClick = () => null
}) => {
  const buttonTheme = buttonThemes[theme]

  return (
    <S.Button
      buttontheme={buttonTheme}
      variant={variant}
      startIcon={loading ? <Loading /> : icon}
      size={sizeButton === 'medium' ? 'medium' : 'large'}
      color={buttonTheme.materialUiColor}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {!loading ? children : null}
    </S.Button>
  )
}
