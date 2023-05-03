import React from 'react'

import { useLoginPage } from './useLoginPage'
import { Button, Loading, PasswordInput, TextField } from '@/components'
import { useHandleChangeFormData } from '@/hooks'
import { LoginParams } from '@/services/api/auth'
import { AuthContainerTemplate } from '@/templates/containers/auth'

export const LoginPage: React.FC = () => {
  const {
    touched,
    loading,
    formData,
    setFormData,
    goToSignUp,
    handleSubmit,
    handleValidate
  } = useLoginPage()
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
            onChange={handleChange('email')}
            disabled={loading}
            touched={touched}
            validator={handleValidate('email')}
          />

          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            value={formData.password}
            onChange={handleChange('password')}
            disabled={loading}
            touched={touched}
            validator={handleValidate('password')}
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
