   import img from "../assets/logo.png"
 import { RxCaretDown } from "react-icons/rx";
 import { BiSolidOffer } from "react-icons/bi";
 import { IoHelpBuoyOutline } from "react-icons/io5";
 import { SlUser } from "react-icons/sl";
 import { CiSearch } from "react-icons/ci";
 import { IoCartOutline } from "react-icons/io5";
 import "./Header.css"
import { useState } from "react";
 export default function Header(){
 const [toggle,setToggle]=  useState(false)
    return(
        <>
        
<div className="overlay"style={{display: toggle? "block" :"none"}} >
<div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      width: "300px",
      margin: "10% auto",
      textAlign: "center",
    }}
    onClick={(e) => e.stopPropagation()} // prevent closing when clicked inside
  >
    <h2>Search coming soon!</h2>
    <button onClick={() => setToggle(false)}>Close</button>
  </div>
</div>
        <header className="header">

            <div className="logo">
<img src={img} alt="" />

<p>
    location
   <button onClick={()=>setToggle(true)}> <RxCaretDown /> </button>
</p>
            </div>


            <div className="icons">
                <div className="search icon">
<CiSearch /> 
<p>Search</p>
                </div>

<div className="offers icon">
<BiSolidOffer />
<p>Offers</p>
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
    <p>Cart</p>
</div>
            </div>

        </header>
        </>
    )
 }