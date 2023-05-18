import React from 'react'
import "./styles/global.scss";
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts'
import { BaseRoutes } from './routes/BaseRoutes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BaseRoutes />
        <Toaster position="top-right" reverseOrder={false} gutter={26} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
