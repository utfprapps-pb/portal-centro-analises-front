import { PropsWithChildren } from 'react'

type Props = {
  onClick?: () => void
}

export type TextProps = PropsWithChildren<Props>
