 
 


import { useRef } from "react";
import Category from "./Category";
 import Restaurants from "./Restaurants"
import Onlinerest from "./Onlinerest"
import Footer from "./Footer"
 export default function Home(){
    const footerRef = useRef(null);
return(
    <>
     <Category/>
    <Restaurants/>
    <Onlinerest footerRef={footerRef} />
    <Footer ref={footerRef}/>
    </>
)
 }