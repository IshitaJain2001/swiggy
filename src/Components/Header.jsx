   import img from "../assets/logo.png" 
 import { RxCaretDown } from "react-icons/rx";
 import { BiSolidOffer } from "react-icons/bi";
 import { IoHelpBuoyOutline } from "react-icons/io5";
 import { SlUser } from "react-icons/sl";
 import { CiSearch } from "react-icons/ci";
 import { IoCartOutline } from "react-icons/io5";
 import { TbCurrentLocation } from "react-icons/tb";
 import { RxCross1 } from "react-icons/rx";
 import "./Header.css"
import { useState } from "react";
import { useDispatch } from "react-redux";

 export default function Header(){
 const [toggle,setToggle]=  useState(false)
const dispatch= useDispatch()
 const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;


      
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          console.log("Location Data:", data);
          let exactlocation = ` ${data.address.town ||
  data.address.village ||
  data.address.county ||
  "Unknown"}, ${data.address.state_district}, ${data.address.state}`
          alert(exactlocation);


  localStorage.setItem("location",exactlocation )
  dispatch({
    type:"ADD_CITY",
    payload:data.address.county
})
        } catch (err) {
          console.error("Error fetching location name:", err);
        }
      },
      (error) => {
        alert("Location access denied or unavailable.");
        console.error(error);
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};

    return(
        <>
        
<div className="overlay" style={{display: toggle? "block" :"none"}} onClick={() => setToggle(false)}>
<div
   className="location-overlay"
 
    onClick={(e) => e.stopPropagation()} 
  >
    <div onClick={() => setToggle(false)}>
        <RxCross1 />
        </div> 

    <div>
        <input type="text" placeholder="Search for area, street name..."/>
        </div> 

    <div onClick={getCurrentLocation}>
        <TbCurrentLocation />
       <h3>
        Get Current Location
        </h3> 
        <p style={{opacity:"0.7"}}>Using GPS</p>
    </div>
  </div>
</div>



        <header className="header">

            <div className="logo">
<img src={img} alt="" />

<p>
  {
  localStorage.getItem("location")? localStorage.getItem("location")
  : "Set Up Your Precise Location"
  }
   <button onClick={()=>setToggle(true)} style={{fontSize:"20px"}}> <RxCaretDown /> </button>
</p>
            </div>


            <div className="icons">
                <div className="search icon">
<CiSearch /> 
<p>Search</p>
                </div>

<div className="offers icon">
<BiSolidOffer />
<p>Offers <sup style={{color:"#fc8019"}}>new</sup></p>
</div>

<div className="help icon">
    <IoHelpBuoyOutline />
    <p>Help</p>
</div>

<div className="signin icon">
    <SlUser />
    <p>Sign In</p>
</div>

<div className="cart icon">
    <IoCartOutline />
    <p>Cart <sup>0</sup></p>
</div>
            </div>

        </header>
        </>
    )
 }