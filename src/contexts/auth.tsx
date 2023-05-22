import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useHistory, useLocalStorage } from '@/hooks'
import { api } from '@/libs'
import {
  LoginParams,
  LoginResponseProps,
  SignUpParams,
  login,
  signUp
} from '@/services/api/auth'
import { InvalidCredentialsError } from '@/services/api/errors'

type AuthContextProps = {
  auth: LoginResponseProps | null
  loading: boolean

  handleSignIn: (params: LoginParams) => Promise<void>
  handleSignOut: () => void
  handleSignUp: (params: SignUpParams) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { navigateToSignedBasePath } = useHistory()
  const navigate = useNavigate()

  const localStorage = useLocalStorage()

  const [authData, setAuthData] = useState<AuthContextProps['auth'] | null>(
    () => {
      const auth = localStorage.get(localStorage.LOCAL_STORAGE_KEYS.AUTH)

      if (auth) return auth
      return null
    }
  )

  const [loading, setLoading] = useState(false)

  const handleSignIn = useCallback(
    async (params: LoginParams) => {
      try {
        setLoading(true)

        const loggedUser = await login(params)
        setAuthData(loggedUser)
        navigateToSignedBasePath()
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          toast.error(error.message)
          return
        }

        const { message } = error as AxiosError
        toast.error(message)
      } finally {
        setLoading(false)
      }
    },
    [navigateToSignedBasePath]
  )

  const handleSignUp = useCallback(
    async (params: SignUpParams) => {
      try {
        setLoading(true)

        const registerUser = await signUp(params)

        if (registerUser != null) {
          navigate('/login')
          toast.success('Cadastrado com sucesso')
        }
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          toast.error(error.message)
          return
        }

        const { message } = error as AxiosError
        toast.error(message)
      } finally {
        setLoading(false)
      }
    },
    [navigateToSignedBasePath]
  )

  const handleSignOut = useCallback(() => {
    setAuthData(null)
  }, [])

  useEffect(() => {
    if (authData) {
      localStorage.set(localStorage.LOCAL_STORAGE_KEYS.AUTH, authData)
      api.defaults.headers.Authorization = `Bearer ${authData.token}`
      return
    }

    delete api.defaults.headers.Authorization
    localStorage.remove(localStorage.LOCAL_STORAGE_KEYS.AUTH)
  }, [authData, localStorage])

  const providerProps = useMemo(
    () => ({
      auth: authData,
      loading,
      handleSignIn,
      handleSignOut,
      handleSignUp
    }),
    [authData, handleSignIn, handleSignOut, loading, handleSignUp]
  )

  return (
    <AuthContext.Provider value={providerProps}>
      {children}
    </AuthContext.Provider>
  )
}
