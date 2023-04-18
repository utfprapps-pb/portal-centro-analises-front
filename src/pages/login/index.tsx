import React from 'react'

import { useLoginPage } from './useLoginPage'
import { Button, Loading, PasswordInput, TextField } from '@/components'
import { useHandleChangeFormData } from '@/hooks'
import { LoginParams } from '@/services/api/auth'
import { AuthContainerTemplate } from '@/templates/containers/auth'

export const LoginPage: React.FC = () => {
  const { loading, formData, setFormData, goToSignUp, handleSubmit } =
    useLoginPage()
  const { handleChange } = useHandleChangeFormData<LoginParams>({
    formData,
    setFormData
  })

  return (
    <AuthContainerTemplate
      title="Bem vindo!"
      description="Digite seus dados para continuar"
      body={
        <>
          <TextField
            label="E-mail"
            placeholder="Digite seu e-mail"
            value={formData.email}
            onChangeValue={handleChange('email')}
            disabled={loading}
          />

          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChangeValue={handleChange('password')}
            disabled={loading}
          />
        </>
      }
      footer={
        <>
          <Button type="submit" disabled={loading}>
            {loading ? <Loading /> : 'Entrar'}
          </Button>
          <Button onClick={goToSignUp} variant="outlined" disabled={loading}>
            Criar nova conta
          </Button>
        </>
      }
      handleSubmit={handleSubmit}
    />
  )
}
