import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Products from '../components/Products'
import Xayaysiin from '../components/Xayaysiin'
import React from 'react'

const Home = () => {
  return (
    <div>
      {/* <Header/> */}
      <HeroSection/>
      <Xayaysiin/>
      <Products/>
      <ContactForm/>
      <Footer/>
    </div>
  )
}

export default Home