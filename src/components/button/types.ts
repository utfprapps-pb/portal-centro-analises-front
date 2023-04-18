import { PropsWithChildren } from 'react'

import { ButtonProps as MaterialButtonProps } from '@material-ui/core'

import { Themes } from './theme'

type Props = {
  children: React.ReactNode
  variant?: MaterialButtonProps['variant']
  theme?: Themes
  icon?: React.ReactNode
  disabled?: boolean
  type?: 'submit' | 'button'
  sizeButton?: 'large' | 'medium'
  onClick?: () => void
}

export type ButtonProps = PropsWithChildren<Props>
