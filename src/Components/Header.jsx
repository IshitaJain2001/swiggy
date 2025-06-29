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

 export default function Header(){
 const [toggle,setToggle]=  useState(false)
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

    <div>
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
    location
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