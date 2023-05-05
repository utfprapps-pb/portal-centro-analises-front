import { useMemo } from 'react'

import { Autocomplete } from '@mui/material'

import * as S from './styles'
import { MultSelectProps } from './types'
import { TextField } from '@/components'

export const MultSelect: React.FC<MultSelectProps> = (props) => {
  const {
    options,
    label,
    value,
    disabled = false,
    autocomplete = false,
    noOptionsText,
    onSelectOption
  } = props

  const cleanOptions = useMemo(() => {
    const optionsId = value.map((option) => option.id)

    return options.filter(({ id }) => !optionsId.includes(id))
  }, [options, value])

  return (
    <S.Container disabled={disabled}>
      <Autocomplete
        id={label}
        options={cleanOptions}
        getOptionLabel={(option) => option.label}
        onChange={(_, option) => onSelectOption(option)}
        value={value}
        multiple
        autoComplete={autocomplete}
        disabled={disabled}
        noOptionsText={noOptionsText}
        clearText="Limpar"
        disableClearable
        renderInput={({ inputProps, InputProps }) => (
          <TextField
            {...props}
            label={label}
            inputElementProps={inputProps}
            materialInputProps={InputProps}
            onChange={() => null}
            value=""
          />
        )}
      />
    </S.Container>
  )
}
