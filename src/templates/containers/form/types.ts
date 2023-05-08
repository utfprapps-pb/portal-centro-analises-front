import { PropsWithChildren } from 'react'

type Props = {
  title: string
  submitButtonText: string
  loading: boolean
  onSubmit: () => Promise<void>
}

export type FormContainerProps = PropsWithChildren<Props>
