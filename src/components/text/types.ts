import { PropsWithChildren } from 'react'

import { Theme } from '@/styles'

type Props = {
  size: keyof Theme['fontSizes']
  color?: keyof Theme['colors']
  fontFamily?: keyof Theme['fontFamily']
  className?: string
  onClick?: () => void
}

export type DesignSystemMapperProps = {
  [key in keyof Theme['fontSizes']]: {
    weight: keyof Theme['fontWeights']
  }
}

export type TextProps = PropsWithChildren<Props>
