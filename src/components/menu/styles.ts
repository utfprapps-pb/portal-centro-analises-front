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
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-transform: inherit !important;
  font-weight: bold !important;
  width: 25%;
  height: 100vh;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
  gap: 1rem;
  background-color: #fff;
  border-radius: 5px;
  section {
    display: flex;
    flex-direction: column;
    align-items: start;
    text-align: center;
    justify-content: center;
    gap: 0.5rem;
  }
  h1 {
    font-size: 0.7rem;
    font-weight: 900;
    color: #e0bb00;
    cursor: pointer;
  }
  svg {
    display: none;
  }
  h2 {
    display: block;
    font-size: 0.7rem;
    font-weight: 200;
    padding: 0.1rem;
    cursor: pointer;
    color: #000;
  }
  h2:hover {
    font-weight: 700;
  }
  p {
    font-size: 1rem;
  }
  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    text-decoration: none;
    cursor: pointer;
    padding-left: 0.5rem;
    width: 100%;
  }
  a:hover {
    background-color: #f5f5f5;
    transition: 0.5s;
    border-right: 5px solid #fcba03;
  }
  a:hover > h2 {
    font-weight: 700;
  }

  ${theme.media.sm} {
    svg {
      display: block;
    }
    h1 {
      font-size: 1rem;
      font-weight: 1000;
      color: #e0bb00;
      letter-spacing: 0.2rem;
      cursor: pointer;
    }
    h2 {
      display: block;
      font-size: 0.7rem;
      font-weight: 200;
      padding: 0.1rem;
      cursor: pointer;
      color: #000;
    }
    section {
      width: 100%;
      gap: 0.8rem;
      align-items: start;
      text-align: left;
      justify-content: start;
    }
  }

  ${theme.media.md} {
    /* Estilo para telas a partir de 600px */
    flex-direction: coluns;
    h1 {
      font-size: 2rem;
      font-weight: 1000;
      color: #e0bb00;
      letter-spacing: 0.2rem;
      cursor: pointer;
    }
    h2 {
      display: block;
      font-size: 1rem;
      font-weight: 200;
      letter-spacing: 0.2rem;
      padding: 1rem;
      cursor: pointer;
      color: #000;
      animation-name: ${changeWeight};
      animation-duration: 0.5s;
      animation-timing-function: forwards;
    }
    a {
      padding-left: 1rem;
    }
    h2 {
      padding: 1rem;
    }
  }
`
