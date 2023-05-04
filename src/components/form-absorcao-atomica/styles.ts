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
    font-weight: 300;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
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

  .radio_box {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    align-items: center;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1rem;
  }

  .radio_box > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    gap: 1rem;
    align-items: center;
    text-align: center;
  }

  .radio_box > div > label {
    display: flex;
    gap: 0.5rem;
  }

  .field_box {
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    width: 100%;
  }

  .field_box p {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  .input_box {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    text-align: center;
    border: 1px solid gray;
    border-radius: 5px
  }

  .input_box > span {
    font-size: 0.8rem;
    width: 100%;
    text-align: right;
    align-items: top;
    padding-right: 1rem;
  }

  .field_box h2 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0px 0px 3px 0px;
  }

  .term_box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    margin: 0;
    padding: 0;
  }

  ${theme.media.sm} {

  }

  ${theme.media.md} {

  }
`
