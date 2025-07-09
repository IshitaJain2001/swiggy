import Header from "./Components/Header"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import Northindian from "./Components/Northindian"
import Search from "./Components/Search"


function App() {

  
  return (
    <>
    <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/north-indian" element={<Northindian/>}/>
    <Route path="/search" element={<Search/>}/>
   </Routes>
    </>
  )
}

export default App
