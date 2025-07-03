import { useState } from "react";
import "./Onlinerest.css"
 export default function Onlinerest(){
      const [city, setCity] = useState(localStorage.getItem("city") || "");
    return(
        <div className="online-container">
        <h2>Restaurants with online food delivery in {city}</h2>
        <div className="buttons">
            <button>Filter</button>
            <button>Sort By</button>
            <button>Fast Delivery</button>
            <button>New on Swiggy</button>
            <button>Ratings 4.0+</button>
            <button>Pure Veg</button>
            <button>Offers</button>
            <button>Rs.300-Rs.600</button>
            <button>Less than Rs.300</button>
        </div>
        </div>
    )
 }