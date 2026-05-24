// import { useState } from 'react'
import { useEffect } from 'react';

import './App.css'

import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { fetchCurrentUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser()).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }, [dispatch])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
