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
  height: 100%;
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
  }

  .row_box {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .inputs_box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .inputs_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .inputs_container a {
    color: var(--black);
  }

  .input_form {
    width: 100%;
    background-color: var(--white);
    border-color: none;
    color: var(--black);
    border: none;
    outline: none;
    height: 1rem;
    padding: 1rem;
    border-radius: 0.2rem;
  }

  .input_form_text_area {
    width: 100%;
    background-color: var(--white);
    border-color: none;
    color: var(--black);
    border: none;
    outline: none;
    height: 8rem;
    padding: 1rem;
    border-radius: 0.2rem;
    text-align: top;
    align-items: top;
  }

  .input_form_select {
    width: 100%;
    background-color: var(--white);
    border-color: none;
    color: var(--black);
    border: none;
    outline: none;
    height: 2rem;
    padding: 0.3rem;
    border-radius: 0.2rem;
    text-align: top;
    align-items: top;
  }

  .field_box {
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    width: 100%;
  }

  .input_box {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    text-align: center;
    border: 1px solid #d1d1d1;
    border-radius: 5px
  }

  .field_box h2 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0px 0px 3px 0px;
  }

  ${theme.media.sm} {

  }

  ${theme.media.md} {

  }
`
