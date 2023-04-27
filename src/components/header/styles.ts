import styled from 'styled-components'

const theme = {
  media: {
    sm: '@media (min-width: 600px)',
    md: '@media (min-width: 960px)',
    lg: '@media (min-width: 1280px)'
  }
}

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: right;
  width: 100%;
  height: 50px;
  align-items: center;
  text-align: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-radius: 5px;
  h2 {
    font-size: 0.7rem;
    font-weight: 400;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
  p {
    font-size: 1rem;
  }

  ${theme.media.md} {
    height: 70px;
    h2 {
      font-size: 1rem;
    }
  }
`
