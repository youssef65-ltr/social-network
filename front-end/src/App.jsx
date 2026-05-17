// import { useState } from 'react'

import './App.css'

import Login from './pages/Login';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { RouterProvider } from "react-router-dom";
import router from "./router";


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
