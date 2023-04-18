import React, { useEffect, useState } from 'react'

import { InputAdornment } from '@material-ui/core'

import * as S from './styles'
import { TextFieldProps } from './types'
import { Loading, Text } from '@/components'

export * from './types'

export const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChange: onChangeValue,
  icon,
  iconPosition = 'end',
  disabled,
  touched,
  loading,
  materialInputProps = {},
  inputElementProps = {},
  labelType = 'outside'
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [wasTouched, setTouched] = useState(touched)
  const [isLoading, setLoading] = useState(loading)
  const [isDisabled, setDisabled] = useState(disabled)

  useEffect(() => {
    if (loading !== undefined) {
      if (isLoading !== loading) setLoading(loading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  useEffect(() => {
    if (touched !== undefined) {
      if (wasTouched !== touched) setTouched(touched)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched])

  useEffect(() => {
    if (disabled !== undefined) {
      if (isDisabled !== disabled) setDisabled(disabled)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  const onChange = (inputValue: string) => {
    onChangeValue(inputValue)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  return (
    <S.Container>
      {labelType === 'outside' && <Text size="b4">{label}</Text>}
      <S.Input
        key={label}
        id={label}
        label={labelType === 'inside' ? label : ''}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        variant="outlined"
        focused={isFocused}
        fullWidth
        inputProps={inputElementProps}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
          ...materialInputProps,
          disabled: isDisabled,
          startAdornment: materialInputProps.startAdornment || (
            <InputAdornment position="start">
              {iconPosition === 'start' && icon}
              {materialInputProps.startAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isLoading && <Loading />}
              {iconPosition === 'end' && icon}
              {materialInputProps.endAdornment}
            </InputAdornment>
          )
        }}
      />
    </S.Container>
  )
}
