import styled, { keyframes } from 'styled-components'

const changeWeight = keyframes`
  0% { font-weight: 200; }
  25% { font-weight: 300; } 
  50% { font-weight: 400; }
  75% { font-weight: 500; }
  100% { font-weight: 700; }
`

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
  flex-direction: column;
  justify-content: right;
  width: 100%;
  height: 100vh;
  align-items: center;
  text-align: center;
  padding: 10px 20px;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 10px;
  gap: 1rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 900;
    color: #3f51b5;
    cursor: pointer;
    margin-top: 1rem;
  }

  h2 {
    font-weight: 300;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    gap: 1rem;
  }


  ${theme.media.sm} {

  }

  ${theme.media.md} {

  }
`
