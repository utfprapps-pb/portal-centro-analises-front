import { ButtonProps } from '@/components'

type Buttons = ButtonProps[]

export type ModalProps = {
  title: string
  description: string
  isOpen: boolean
  buttons: Buttons
  handleClickOnClose: () => void
}
