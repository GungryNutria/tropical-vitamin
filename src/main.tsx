import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import '@fontsource/bungee'
import '@fontsource-variable/work-sans'
import './css/tokens.css'
import './css/main.css'
import './css/componentes.css'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
