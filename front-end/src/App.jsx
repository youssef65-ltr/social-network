import { useState } from 'react'

import './App.css'

import Login from './pages/login';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <Login></Login>
    </ThemeProvider>
  )
}

export default App
