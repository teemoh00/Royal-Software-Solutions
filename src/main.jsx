import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './styles.css'
import App from './App.jsx'
import { CompanyProvider } from './services/CompanyContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CompanyProvider>
        <App />
      </CompanyProvider>
    </HelmetProvider>
  </StrictMode>,
)
