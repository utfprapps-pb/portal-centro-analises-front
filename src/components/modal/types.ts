import { ButtonProps } from '@/components'

type Button = ButtonProps & { key: string }

type Buttons = Button[]

export type ModalProps = {
  title: string
  description: string
  isOpen: boolean
  buttons: Buttons
  handleClickOnClose: () => void
}
