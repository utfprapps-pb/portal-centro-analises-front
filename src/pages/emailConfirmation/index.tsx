import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import * as S from './styles'
import { Loading, Typography } from '@/components'
import { useHistory } from '@/hooks'
import { ROUTES } from '@/routes'
import { emailConfirm } from '@/services/api/email-confirm'

export const EmailConfirmationPage: React.FC = () => {
  const { hashKey } = useParams()
  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>()
  const { navigate } = useHistory()

  const redirect = () => {
    window.setTimeout(() => {
      navigate(ROUTES.login.path())
    }, 5000)
  }

  useEffect(() => {
    const checkHashKey = async () => {
      const r = await emailConfirm({ hashKey: hashKey ?? '' })
      setIsValidEmail(r)
      console.log(isValidEmail)
      if (isValidEmail) {
        redirect()
      }
    }
    checkHashKey()
  }, [hashKey, isValidEmail])

  const body = () => {
    if (isValidEmail) {
      return (
        <S.Container>
          <Typography color="primary" weight="bold" size="h4">
            Email validado com sucesso
          </Typography>
          <Typography color="primary" weight="light" size="b3">
            Seu endereço de email foi validado com sucesso.
          </Typography>
          <Typography color="primary" weight="light" size="b3">
            Agora você será redirecionado para o Login.
          </Typography>
        </S.Container>
      )
    }
    if (isValidEmail === false) {
      return (
        <S.Container>
          <Typography color="black" weight="bold" size="h4">
            Ocorreu um erro
          </Typography>
          <Typography color="black" weight="light" size="b3">
            Ocorreu um erro ao validar seu email.
          </Typography>
          <Typography color="black" weight="light" size="b3">
            Entre em contato com o suporte.
          </Typography>
        </S.Container>
      )
    }

    return (
      <S.Container>
        <Loading />
      </S.Container>
    )
  }

  return <div>{body()}</div>
}
