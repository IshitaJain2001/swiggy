import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Restaurants.css"
export default function Restaurants() {
  const cityname = useSelector((state) => state.city);
  const [city, setCity] = useState(localStorage.getItem("city") || "");
const [restaurants,setRestaurants]= useState([])
useEffect(()=>{
    
})
  useEffect(() => {
    if (cityname) {
      localStorage.setItem("city", cityname);
      setCity(cityname); 
    }
  }, [cityname]);

  return <>
  <div className="restaurant-container">
  <h2>


  Top restaurant chains in {" "} 
  {
    city ? city : " In Your Location"}
      </h2>
  </div>

    </>;
}
