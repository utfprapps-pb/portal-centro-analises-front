import { PropsWithChildren } from 'react'

type Props = {
  apply: () => void
  cancel: () => void
}

export type ModalFilterProps = PropsWithChildren<Props>
