// import { useState } from 'react'
import { useEffect, useState } from 'react';

import './App.css'

import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { fetchCurrentUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';
import Loading from '@/components/loading';


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCurrentUser()).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setLoading(false)
    });
  }, [dispatch])

  if (loading) {
    return (
        <Loading />
    )
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ModeToggle></ModeToggle>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
