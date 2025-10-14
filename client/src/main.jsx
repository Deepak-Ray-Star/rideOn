import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './context/AppContext.jsx'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {MotionConfig} from 'motion/react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppContextProvider>
    <MotionConfig viewport={{once: true}}>
      <App />
    </MotionConfig>
  </AppContextProvider>
  </BrowserRouter>,
)
