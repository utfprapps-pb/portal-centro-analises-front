import { useEffect, useState } from 'react'

import { TextFieldProps } from './types'

export const useTextField = (props: TextFieldProps) => {
  const { touched, loading, disabled, onChangeValue } = props

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

  const onChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = ({ target: { value } }) => {
    onChangeValue(value)
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  return {
    isFocused,
    wasTouched,
    isLoading,
    isDisabled,
    onChange,
    onFocus,
    onBlur
  }
}
