import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Route, Routes } from 'react-router'
import Welcome from './Welcome.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/game/:gameId' element={<App />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>,
)
