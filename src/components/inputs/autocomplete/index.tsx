import { Autocomplete as UIAutocomplete } from '@mui/material'

import { AutocompleteProps } from './types'
import { TextField } from '@/components'

export const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const {
    label,
    value,
    options,
    disabled = false,
    loading = false,
    noOptionsText,
    onSelectOption
  } = props

  return (
    <UIAutocomplete
      id={label}
      getOptionLabel={(option) => option.label}
      options={disabled ? [] : options}
      clearText="Limpar"
      noOptionsText={noOptionsText}
      disabled={disabled}
      loading={loading}
      loadingText="Carregando..."
      disableListWrap={disabled}
      disableClearable={disabled}
      disabledItemsFocusable={disabled}
      value={value}
      onChange={(_, option) => onSelectOption(option || { id: '', label: '' })}
      clearOnBlur
      clearOnEscape
      renderInput={({ inputProps, InputProps }) => {
        const { value: textFieldValue } = inputProps as any

        return (
          <TextField
            {...props}
            label={label}
            inputElementProps={inputProps}
            materialInputProps={InputProps}
            value={textFieldValue}
          />
        )
      }}
    />
  )
}
