import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routers/router'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ThemeProvider from './provider/ThemeProvider'
import { HelmetProvider } from 'react-helmet-async'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <HelmetProvider>
          <RouterProvider router={router} />
          </HelmetProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>,
)
