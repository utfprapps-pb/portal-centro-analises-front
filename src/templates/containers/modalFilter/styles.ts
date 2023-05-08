import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;

  padding: 32px;
  gap: 48px;
  width: 480px;

  background: ${({ theme }) => theme.colors.white};
  filter: drop-shadow(0px 16px 16px rgba(50, 50, 71, 0.12))
    drop-shadow(0px 24px 32px rgba(50, 50, 71, 0.16));
`

export const Content = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 100%;
  gap: 24px;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const Overlay = styled.div`
  top: calc(100% + 16px);
  right: -16px;
  position: absolute;
`

export const Triangle = styled.div`
  position: absolute;

  width: 0;
  height: 0;

  z-index: 1;

  top: -10px;
  right: 10px;

  border-left: 24px solid transparent;
  border-right: 24px solid transparent;
  border-bottom: 20px solid ${({ theme }) => theme.colors.white};
`
