import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Route, Routes } from 'react-router'
import Welcome from './Welcome.tsx'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          {/* Screen to force player to put info before joining a game */}
          <Route path='/pregame-info/:gameId' element={<Welcome />} />
          <Route path='/game/:gameId' element={<App />} />
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
)
