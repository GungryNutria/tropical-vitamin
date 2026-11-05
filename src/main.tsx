import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './css/main.css'
import './css/variables.css'
import './css/faq.css'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import { loadSocial } from './services/socialService'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

loadSocial()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
