import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import HeroSection from './components/HeroSection'
import Xayaysiin from './components/Xayaysiin'
import Products from './components/Products'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import About from './pages/About'
import Home from './pages/Home'

const App = () => {
  return (
    <div>
     <Header/>
     <Outlet/>
    </div>
  )
}

export default App