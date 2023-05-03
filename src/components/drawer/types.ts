import { PropsWithChildren } from 'react'

type Props = {
  title: string
  open: boolean
  onClose: () => void
}

export type DrawerProps = PropsWithChildren<Props>
