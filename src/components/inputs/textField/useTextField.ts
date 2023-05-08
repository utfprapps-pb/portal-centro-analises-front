import { useCallback, useEffect, useState } from 'react'

import { TextFieldProps } from './types'

export const useTextField = (props: TextFieldProps) => {
  const {
    value,
    error = '',
    touched,
    loading,
    disabled,
    onChange,
    validator
  } = props

  const [inputError, setInputError] = useState<string>(error)
  const [isFocused, setIsFocused] = useState(false)
  const [inputTouched, setInputTouched] = useState(touched)
  const [isLoading, setLoading] = useState(loading)
  const [isDisabled, setDisabled] = useState(disabled)

  const handleCheckErrors = useCallback(
    () => validator && inputTouched && setInputError(validator()),
    [inputTouched, setInputError, validator]
  )

  const handleOnChange = useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >(
    (event) => {
      setInputTouched(true)
      handleCheckErrors()
      onChange(event.target.value)
    },
    [handleCheckErrors, onChange]
  )

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setInputTouched(true)
    setIsFocused(false)
    handleCheckErrors()
  }, [handleCheckErrors])

  useEffect(() => {
    handleCheckErrors()
  }, [value, handleCheckErrors])

  useEffect(() => {
    if (loading !== undefined) {
      if (isLoading !== loading) setLoading(loading)
    }
  }, [isLoading, loading])

  useEffect(() => {
    if (touched !== undefined) {
      if (inputTouched !== touched) setInputTouched(touched)
    }
  }, [inputTouched, touched])

  useEffect(() => {
    if (disabled !== undefined) {
      if (isDisabled !== disabled) setDisabled(disabled)
    }
  }, [disabled, isDisabled])

  return {
    inputError,
    isFocused,
    inputTouched,
    isLoading,
    isDisabled,
    handleOnChange,
    handleOnFocus,
    handleOnBlur
  }
}
