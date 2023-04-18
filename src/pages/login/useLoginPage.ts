import { useCallback, useState } from 'react'

import { useAuth, useHistory } from '@/hooks'
import { ROUTES } from '@/routes'
import { LoginParams } from '@/services/api/auth'

const INITIAL_FORM_DATA: LoginParams = {
  email: '',
  password: ''
}

export const useLoginPage = () => {
  const { loading, handleSignIn } = useAuth()
  const { navigate } = useHistory()

  const [formData, setFormData] = useState<LoginParams>(INITIAL_FORM_DATA)

  const goToSignUp = useCallback(
    () => navigate(ROUTES.signUp.path()),
    [navigate]
  )

  const handleSubmit = useCallback(async () => {
    await handleSignIn(formData)
  }, [formData, handleSignIn])

  return {
    loading,
    formData,
    setFormData,
    goToSignUp,
    handleSubmit
  }
}
