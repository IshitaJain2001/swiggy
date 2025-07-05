

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "./Restaurants.css";

export default function Restaurants() {
  const cityname = useSelector((state) => state.city);
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [restaurants, setRestaurants] = useState([]);
  const scrollRef = useRef(null);
const position= useSelector(state=>state.position)
console.log("Latitude:", position.latitude);
console.log("Longitude:", position.longitude);
const dispatch= useDispatch()
useEffect(() => {
  const storedPosition = localStorage.getItem("coordinates");
  const storedCity = localStorage.getItem("city");

  if (storedPosition) {
    dispatch({
      type: "ADD_LOCATION",
      payload: JSON.parse(storedPosition),
    });
  }

  if (storedCity) {
    dispatch({
      type: "ADD_CITY",
      payload: storedCity,
    });
  }
}, []);

 useEffect(() => {
  async function getRest() {
    if (!position.latitude || !position.longitude) return;

    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${position.latitude}&lng=${position.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      const data = await res.json();

      console.log("Swiggy API Response:", data);

      // 👇 You need to access data.data.cards[*].card.card.info array
      const restaurantsList = data?.data?.cards
        ?.flatMap((card) => card?.card?.card?.restaurants || [])
        ?.map((r) => r?.info || r); // just in case

      setRestaurants(restaurantsList || []);
    } catch (error) {
      console.error("❌ Swiggy API error:", error);
    }
  }

  getRest();
}, [position.latitude, position.longitude]);


  useEffect(() => {
    if (cityname) {
      localStorage.setItem("city", cityname);
      setCity(cityname);
    }
  }, [cityname]);

  const filteredArea = restaurants.filter((res) =>
    res.place.toLowerCase().includes(city.toLowerCase())
  );

  return (
    <>
   
    <div className="restaurant-container">
      <div className="inner-con">
        {/* Heading + Arrows Row */}
        <div className="top-heading">
          <h2>
            Top restaurant chains in {city ? city : "your location"}
          </h2>

          <div className="arrows">
            <button onClick={() => scrollRef.current.scrollBy({ left: -600, behavior: "smooth" })}>
              <FaArrowLeft />
            </button>
            <button onClick={() => scrollRef.current.scrollBy({ left: 600, behavior: "smooth" })}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {filteredArea.length > 0 ? (
          <div className="restaurant-grid" ref={scrollRef}>
            {filteredArea.map((res, index) => (
              <div className="restaurant-card" key={index}>
                <img src={res.image} alt={res.name} />
                <h3>{res.title}</h3>
                <p className="title">{res.name}</p>
                <p className="rating">
                  ⭐ {res.rating} | ⏱ {res.minTime}-{res.maxTime} mins
                </p>
                <p className="offer">{res.offer}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No Restaurants in your area</p>
        )}
        
      </div>
     
    </div>
     <hr />
      </>
  );
}

