import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css'
import './css/variables.css'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
