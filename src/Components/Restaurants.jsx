

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import "./Restaurants.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Restaurants() {
  const cityname = useSelector((state) => state.city);
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [restaurants, setRestaurants] = useState([]);
  const scrollRef = useRef(null);

  const {category} = useParams()
  console.log(category, "eiorjeoofodsjsoj")

  useEffect(() => {
    async function getRest() {
      const data = await fetch("/restaurants.json");
      const res = await data.json();
      setRestaurants(res);
    }

    getRest();
  }, []);

  useEffect(() => {
    if (cityname) {
      localStorage.setItem("city", cityname);
      setCity(cityname);
    }
  }, [cityname]);

  const filteredArea = restaurants.filter((res) =>
    res.state
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
          <div className="restaurant-grid1" ref={scrollRef}>
            {filteredArea.map((res, index) => (
              <Link to={`/restaurants/${category}/${res.title}`} className="restaurant-card" key={index}>
                <img src={res.image} alt={res.name} />
                <h3>{res.title}</h3>
                <p className="title">{res.name}</p>
                <p className="rating">
                  ⭐ {res.rating} | ⏱ {res.minTime}-{res.maxTime} mins
                </p>
                <p className="offer">{res.offer}</p>
              </Link>
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
