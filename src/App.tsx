import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import BackgroundMusic from './components/BackgroundMusic'

const App: React.FC = () => {
  return (
    <Router basename='/mariage-Zaraniaina-Sarobidy'>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <BackgroundMusic />
      </div>
    </Router>
  )
}

export default App