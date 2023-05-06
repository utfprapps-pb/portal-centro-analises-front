import { createGlobalStyle } from 'styled-components'

import { theme } from '@/styles/themes'

export const ResetStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  button, link, input[type="submit"] {
    cursor: pointer;
  }

  body {
    color: ${theme.colors.text};
		font-family: ${theme.fontFamily.primary};
		background-color: ${theme.colors.background};
    line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
    min-height: 100vh;
  }

  html {
    overflow: hidden;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`
