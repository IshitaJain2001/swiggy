import { useEffect, useRef, useState } from "react";
import { RxCaretDown } from "react-icons/rx";
import { LuGitPullRequest } from "react-icons/lu";
import "./Onlinerest.css";

export default function Onlinerest({ footerRef }) {
  const [city] = useState(localStorage.getItem("city") || "Delhi");
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const loaderRef = useRef(null);

  // 📦 Fetch restaurant data
  useEffect(() => {
    fetch("/restaurants.json")
      .then((res) => res.json())
      .then((data) => {
        const repeated = Array(10).fill(data).flat();
        setAllRestaurants(repeated);
        setVisibleCount(8); // Initially show 8
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 👁️ Observe footer visibility
  useEffect(() => {
    if (!footerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [footerRef]);

  // 🔄 Infinite Scroll Handler
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoadingMore &&
          !isFooterVisible &&
          visibleCount < allRestaurants.length
        ) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 8);
            setIsLoadingMore(false);
          }, 600);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [isFooterVisible, isLoadingMore, visibleCount, allRestaurants.length]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="online-container">
      <h2>Restaurants with online food delivery in {city}</h2>

      {/* Filter Buttons */}
      <div className="buttons">
        <button>
          Filter
          <LuGitPullRequest style={{ transform: "rotate(90deg)", marginLeft: "4px" }} />
        </button>
        <button>
          Sort By
          <RxCaretDown style={{ marginLeft: "4px" }} />
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
        {allRestaurants.slice(0, visibleCount).map((res, i) => (
          <div className="restaurant-card" key={i}>
            {!loadedImages[i] && <div className="img-loader"></div>}
            <img
              src={res.image}
              alt={res.name}
              style={{ display: loadedImages[i] ? "block" : "none" }}
              onLoad={() => handleImageLoad(i)}
            />
            <h3>{res.name}</h3>
            <p>⭐ {res.rating} | ⏱ {res.deliveryTime}</p>
            <p className="offer">{res.offer}</p>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {visibleCount < allRestaurants.length && (
        <div ref={loaderRef} className="scroll-loader">
          {isLoadingMore && <p>Loading more...</p>}
        </div>
      )}
    </div>
  );
}
