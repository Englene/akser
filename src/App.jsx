import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import PassordVegg from './components/PassordVegg'

function App() {
  const [erAutentisert, setErAutentisert] = useState(false)

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tjenester" element={<Services />} />
        <Route path="/om-oss" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
