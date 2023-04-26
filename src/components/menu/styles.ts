import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: left;
  text-transform: inherit !important;
  font-weight: bold !important;
  width: 20%;
  height: 100vh;
  align-items: center;
  text-align: center;
  padding: 1rem;
  border-right: 1px solid gray;
  gap: 1rem;
  h2 {
    font-size: 1rem;
    font-weight: 200;
    letter-spacing: 0.2rem;
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid #e8e8e8;
    color: #000;
  }
  h2:hover {
    color: gray;
    transition: 0.5s;
  }
  p {
    font-size: 1rem;
  }
`
