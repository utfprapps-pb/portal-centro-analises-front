import styled from 'styled-components'

import { darken } from '@/utils'

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background: ${({ theme }) => darken({ color: theme.colors.primary })};
  min-height: 100vh;
`

export const Form = styled.form`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  padding: 42px 64px;
  width: 100%;
  max-width: 480px;

  display: flex;
  flex-direction: column;

  gap: 48px;

  ${({ theme }) => theme.media.forPhoneOnly()} {
    padding: 32px 24px;

    border-radius: 0;

    height: 100%;
    min-height: 100vh;
  }
`

export const FormBody = styled.div`
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  gap: 24px;
  margin: auto 0;

  ${({ theme }) => theme.media.forPhoneOnly()} {
    gap: 12px;
  }
`

export const FormFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
  gap: 8px;
  margin-top: auto;
`

export const FormHeader = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;

  width: 100%;
  gap: 4px;
`
