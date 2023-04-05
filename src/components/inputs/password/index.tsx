import React, { useMemo, useState } from 'react'

import { IconButton } from '@material-ui/core'
import { VisibilityOutlined, VisibilityOffOutlined } from '@material-ui/icons'

import { TextField, TextFieldProps } from '@/components'

export type PasswordInputProps = TextFieldProps

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  const icon = useMemo(() => {
    const onClick = () => setShowPassword((state) => !state)

    return (
      <IconButton onClick={onClick}>
        {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
      </IconButton>
    )
  }, [showPassword])

  return (
    <TextField
      {...props}
      inputElementProps={{
        type: showPassword ? 'text' : 'password'
      }}
      icon={icon}
    />
  )
}
