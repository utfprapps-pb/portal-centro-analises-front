import React from 'react'

import { TextProps } from './types'
import { Typography } from '@/components/'

export * from './types'

export const Text: React.FC<TextProps> = ({
  onClick,

  children
}) => {
  return (
    <Typography
      onClick={onClick}
    >
      {children}
    </Typography>
  )
}
