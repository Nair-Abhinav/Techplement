import { Outlet } from "react-router-dom"
import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { useState } from "react"




function App() {
  return (
    
    <>
      <Header  />
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
