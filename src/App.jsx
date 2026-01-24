import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import PassordVegg from './components/PassordVegg'
import { useLenis } from './hooks/useLenis'

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/tjenester', element: <Services /> },
  { path: '/om-oss', element: <About /> }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
})

function App() {
  const [erAutentisert, setErAutentisert] = useState(false)

  // Enable Lenis smooth scroll
  useLenis()

  useEffect(() => {
    const autentisert = localStorage.getItem('akser_autentisert') === 'true'
    setErAutentisert(autentisert)
  }, [])

  const handleUnlock = () => {
    localStorage.setItem('akser_autentisert', 'true')
    setErAutentisert(true)
  }

  if (!erAutentisert) {
    return <PassordVegg onUnlock={handleUnlock} />
  }

  return <RouterProvider router={router} />
}

export default App
