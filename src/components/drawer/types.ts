import { PropsWithChildren } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

export type DrawerProps = PropsWithChildren<Props>
