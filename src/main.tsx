import React from 'react'

import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'

import { App } from '@/App'
import { ResetStyle, theme } from '@/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
      <ResetStyle />
    </React.StrictMode>
  </ThemeProvider>
)
