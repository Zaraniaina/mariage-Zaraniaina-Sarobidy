import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Preloader from './components/Preloader'
import MusicToggle from './components/MusicToggle'

const App: React.FC = () => {
  return (
    <Router basename="/mariage-Zaraniaina-Sarobidy/">
      <Preloader />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <MusicToggle />
      </div>
    </Router>
  )
}

export default App