import { useCallback, useState } from 'react'

import { toast } from 'react-hot-toast'

import { useAuth, useHandleValidate, useHistory } from '@/hooks'
import { loginValidation } from '@/pages/login/loginValidations'
import { ROUTES } from '@/routes'
import { LoginParams } from '@/services/api/auth'

const INITIAL_FORM_DATA: LoginParams = {
  email: '',
  password: ''
}

export const useLoginPage = () => {
  const { loading, handleSignIn } = useAuth()
  const { navigate } = useHistory()
  const validation = loginValidation()

  const [formData, setFormData] = useState<LoginParams>(INITIAL_FORM_DATA)
  const [touched, setTouched] = useState(false)

  const { formIsValid, handleValidate } = useHandleValidate<
    keyof LoginParams,
    LoginParams
  >({
    formData,
    validation
  })

  const goToSignUp = useCallback(
    () => navigate(ROUTES.signUp.path()),
    [navigate]
  )

  const handleSubmit = useCallback(async () => {
    setTouched(true)

    if (!formIsValid) {
      toast.error('Preencha os campos obrigatórios')
      return
    }

    await handleSignIn(formData)
  }, [formData, formIsValid, handleSignIn])

  return {
    touched,
    loading,
    formData,
    setFormData,
    goToSignUp,
    handleSubmit,
    handleValidate
  }
}
