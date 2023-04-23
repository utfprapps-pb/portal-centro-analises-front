import React from 'react'

import * as S from './styles'
import { FormControlLabelProps } from './types'

export const Checkbox: React.FC<FormControlLabelProps> = ({
  icon,

  checked = false,
  checkedIcon,

  disabled,
  disabledRipple = true,

  color = 'primary',

  label = '',
  labelPlacement = 'end',

  size = 'medium',

  onChange
}) => (
  <S.Container>
    <S.FormcontrolLabel
      label={label}
      onChange={onChange}
      disabled={disabled}
      checked={checked}
      labelPlacement={labelPlacement}
      control={
        <S.CheckBox
          size={size}
          color={color}
          disableRipple={disabledRipple}
          icon={icon}
          checkedIcon={checkedIcon}
        />
      }
    />
  </S.Container>
)
