import { useEffect, useRef, useState } from "react";
import "./Onlinerest.css";
import { RxCaretDown } from "react-icons/rx";
import { LuGitPullRequest } from "react-icons/lu";

export default function Onlinerest() {
  const [city, setCity] = useState(localStorage.getItem("city") || "");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // show 8 initially
  const [loadedImages, setLoadedImages] = useState({});
  const loaderRef = useRef(null);

  // Fetch data from public folder
  useEffect(() => {
    fetch("/restaurants.json")
      .then((res) => res.json())
      .then((data) => {
        const repeated = Array(20).fill(data).flat(); // repeat 10 times
        setAllRestaurants(repeated);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisibleCount((prev) => prev + 8), 500);
        }
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [visibleCount]);

  // Handle Image Load
  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="online-container">
      <h2>Restaurants with online food delivery in {city}</h2>

      <div className="buttons">
        <button>
          Filter
          <LuGitPullRequest style={{ transform: "rotate(90deg)", fontSize: "14px", marginLeft: "4px" }} />
        </button>
        <button>
          Sort By
          <RxCaretDown style={{ fontSize: "20px", marginLeft: "4px" }} />
        </button>
        <button>Fast Delivery</button>
        <button>New on Swiggy</button>
        <button>Ratings 4.0+</button>
        <button>Pure Veg</button>
        <button>Offers</button>
        <button>Rs.300-Rs.600</button>
        <button>Less than Rs.300</button>
      </div>

      {/* Restaurant Cards */}
      <div className="restaurant-grid">
        {allRestaurants.slice(0, visibleCount).map((res, index) => (
          <div className="restaurant-card" key={index}>
            {!loadedImages[index] && <div className="img-loader"></div>}

            <img
              src={res.image}
              alt={res.name}
              style={{ display: loadedImages[index] ? "block" : "none" }}
              onLoad={() => handleImageLoad(index)}
            />

            <h3>{res.name}</h3>
            <p>⭐ {res.rating} | ⏱ {res.deliveryTime}</p>
            <p className="offer">{res.offer}</p>
          </div>
        ))}
      </div>

      <div ref={loaderRef} className="scroll-loader"></div>
    </div>
  );
}
