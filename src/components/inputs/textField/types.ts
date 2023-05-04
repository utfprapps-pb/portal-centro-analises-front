import { InputProps } from '@material-ui/core'

export type TextFieldProps = {
  label: string
  value: string
  placeholder?: string
  icon?: JSX.Element
  iconPosition?: 'start' | 'end'
  disabled?: boolean
  touched?: boolean
  loading?: boolean
  materialInputProps?: Partial<InputProps>
  labelType?: 'outside' | 'inside' | 'without'
  error?: string

  onChange: (value: string) => void
  validator?: () => string
}
