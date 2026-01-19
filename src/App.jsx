import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'

function App() {
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
