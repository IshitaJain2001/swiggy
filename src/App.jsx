import Header from "./Components/Header"
import "./App.css"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import Restaurantspage from "./Components/Restaurantspage"
import RestaurantDetails from "./Components/RestaurantDetails"
import Search from "./Components/Search"
import CartPage from "./Components/Cartpage"
import SupportPage from "./Components/SupportPage"
import Faq from "./Components/Faq"
import Filtered_res_page from "./Pages/Filtered_res_page"
import Homepage from "./Pages/Homepage"
import Dineout from "./Components/Dineout"
import DineoutPage from "./Pages/DineoutPage"
import InstamartPage from "./Pages/InstamartPage"


function App() {

  const location = useLocation();
  const hidePath = ['/', '/instamart']

  const hideNavbar = hidePath.includes(location.pathname);
  
  return (
    <>
    {!hideNavbar && <Header/>}
    
   <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/restaurants" element={<Restaurantspage/>}/>
    <Route path="/restaurants/:category" element={<Filtered_res_page/>}/>

    <Route path="/restaurants/:category/:restaurant" element={<RestaurantDetails/>}/>
    <Route path="/restaurants/:restaurant" element={<RestaurantDetails/>} />
    
    <Route path="/dineout" element={<DineoutPage/>}/>
    <Route path="/dineout/:id" element={<Dineout/>}/>

    <Route path="/instamart" element={<InstamartPage/>}/>
    
    <Route path="/search" element={<Search/>}/>
    <Route path="/Cart" element={<CartPage/>}/>


    <Route path="/support" element={<SupportPage/>}>
      <Route index element={<Navigate to="partner_onboarding" replace />} />
      <Route path=":category" element={<Faq/>} />
    </Route>
   </Routes>
   
    </>
  )
}

export default App
