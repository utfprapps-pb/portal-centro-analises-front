import { PropsWithChildren } from 'react'

type Props = {
  value?: boolean
  icon?: React.ReactNode

  checked?: boolean
  checkedIcon?: React.ReactNode

  disabled?: boolean
  disabledRipple?: boolean

  color?: 'default' | 'primary' | 'secondary'

  label?: string
  labelPlacement?: 'bottom' | 'end' | 'start' | 'top'

  size?: 'small' | 'medium'

  onChange?: (event: any) => void
}

export type CheckboxProps = PropsWithChildren<Props>
