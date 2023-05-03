import { createPortal } from 'react-dom'

import * as S from './styles'
import { ModalProps } from './types'
import { Button } from '@/components'

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  buttons,
  isOpen,
  handleClickOnClose
}) =>
  createPortal(
    <S.Overlay isVisible={isOpen}>
      {isOpen && (
        <S.Container>
          <S.CloseIcon onClick={handleClickOnClose} />

          <S.Header>
            <S.Title size="h6">{title}</S.Title>
            <S.Description size="b2">{description}</S.Description>
          </S.Header>

          <S.ButtonGroup>
            {buttons.map((props) => (
              <Button {...props}>{props.children} </Button>
            ))}
          </S.ButtonGroup>
        </S.Container>
      )}
    </S.Overlay>,
    document.body
  )
