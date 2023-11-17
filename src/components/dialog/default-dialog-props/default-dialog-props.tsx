import { DialogProps } from '@/components/dialog/dialog-provider'

export const RemoveQuestionDefaultProps: DialogProps = {
  title: 'Deseja mesmo excluir o registro?',
  content: 'Essa ação não poderá ser revertida.'
}

export const InactivateQuestionDefaultProps: DialogProps = {
  title: 'Deseja mesmo inativar o registro?',
  content: 'Essa ação poderá ser revertida ao ativar o registro novamente.',
}
