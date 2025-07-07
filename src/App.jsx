import Header from "./Components/Header"
import "./App.css"
import Category from "./Components/Category"
import Restaurants from "./Components/Restaurants"
import Onlinerest from "./Components/Onlinerest"
import Footer from "./Components/Footer"
import { useRef } from 'react';
function App() {

  const footerRef = useRef(null);
  return (
    <>
    <Header/>
    <Category/>
    <Restaurants/>
    <Onlinerest footerRef={footerRef} />
    <Footer ref={footerRef}/>
    </>
  )
}

export default App
