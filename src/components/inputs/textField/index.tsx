import React from 'react'

import { InputAdornment } from '@material-ui/core'

import * as S from './styles'
import { TextFieldProps } from './types'
import { useTextField } from './useTextField'
import { Loading } from '@/components'

export * from './types'

export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    label,
    placeholder,
    value,
    icon,
    iconPosition = 'end',
    materialInputProps = {},
    labelType = 'inside'
  } = props

  const {
    inputError,
    inputTouched,
    isFocused,
    isDisabled,
    isLoading,
    handleOnFocus,
    handleOnBlur,
    handleOnChange
  } = useTextField(props)

  return (
    <S.Container>
      {labelType === 'outside' && <S.Label size="b4">{label}</S.Label>}
      <S.Input
        key={label}
        id={label}
        label={labelType === 'inside' ? label : ''}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        variant="outlined"
        error={inputTouched && !isLoading && !!inputError}
        helperText={inputTouched && !isLoading && inputError}
        focused={isFocused}
        fullWidth
        InputProps={{
          ...materialInputProps,
          inputProps: {
            ...materialInputProps.inputProps
          },
          disabled: isDisabled,
          startAdornment: materialInputProps.startAdornment || (
            <InputAdornment position="start">
              {iconPosition === 'start' && icon}
              {materialInputProps.startAdornment}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {inputTouched && !isLoading && !inputError && <S.ValidIcon />}
              {inputTouched && !isLoading && inputError && <S.InvalidIcon />}
              {isLoading && <Loading />}
              {iconPosition === 'end' && icon}
              {materialInputProps.endAdornment}
            </InputAdornment>
          )
        }}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
    </S.Container>
  )
}
