import React from 'react'
import "./styles/global.scss";
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts'
import { App } from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} gutter={26} />
        <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
