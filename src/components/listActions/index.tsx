import { useRef, useState } from 'react'

import { IconButton } from '@mui/material'
import { DotsThree } from 'phosphor-react'

import * as S from './styles'
import { ListActionsProps } from './type'
import { Popover } from '@/components'

export const ListActions: React.FC<ListActionsProps> = ({ actions }) => {
  const [open, setOpen] = useState(false)

  const ref = useRef(null)

  return (
    <S.Container>
      <IconButton onClick={() => setOpen(!open)}>
        <DotsThree ref={ref} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
      >
        <S.ActionsContainer>
          {actions.map(({ background, color, icon, text, onClick }) => (
            <S.Action
              key={text}
              color={color}
              background={background}
              onClick={onClick}
            >
              {icon} {text}
            </S.Action>
          ))}
        </S.ActionsContainer>
      </Popover>
    </S.Container>
  )
}
