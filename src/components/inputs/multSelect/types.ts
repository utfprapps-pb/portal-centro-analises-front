import { TextFieldProps } from '@/components'
import { Option } from '@/types'

type Props = {
  value: Option[]
  options: Option[]
  onSelectOption: (option: Option[]) => void

  noOptionsText?: string
  autocomplete?: boolean
}

export type MultSelectProps = Props & Omit<TextFieldProps, 'value' | 'onChange'>
