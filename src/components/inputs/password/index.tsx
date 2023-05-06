import React, { useMemo, useState } from 'react'

import { IconButton } from '@mui/material'
import { Eye, EyeSlash } from 'phosphor-react'

import { TextField, TextFieldProps } from '@/components'

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const icon = useMemo(() => {
    const onClick = () => setShowPassword((state) => !state)

    return (
      <IconButton onClick={onClick}>
        {showPassword ? <Eye /> : <EyeSlash />}
      </IconButton>
    )
  }, [showPassword])

  return (
    <TextField
      {...props}
      materialInputProps={{
        inputProps: {
          type: showPassword ? 'text' : 'password'
        }
      }}
      icon={icon}
    />
  )
}

export type PasswordInputProps = TextFieldProps
