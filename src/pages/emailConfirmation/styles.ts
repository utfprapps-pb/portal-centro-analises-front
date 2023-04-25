import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  min-width: 100%;
`
