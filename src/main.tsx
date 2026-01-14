import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css'
import './css/variables.css'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
