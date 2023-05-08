import { createPortal } from 'react-dom'

import * as S from './styles'
import { ModalProps } from './types'
import { Button, Text } from '@/components'

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
            <Text size="h6" color="text">
              {title}
            </Text>
            <Text size="b2" color="text">
              {description}
            </Text>
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
