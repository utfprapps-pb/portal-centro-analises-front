import { TextFieldProps } from '@/components'
import { Option } from '@/types'

type Props = {
  value: Option
  options: Option[]
  onSelectOption: (option: Option) => void
  noOptionsText?: string
}

export type AutocompleteProps = Props & Omit<TextFieldProps, 'value'>
