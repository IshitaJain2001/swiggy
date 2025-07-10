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
  const [isPureVeg, setIsPureVeg] = useState(false);
  const [goodRating, setGoodRating] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [fastDelivery, setFastDelivery] = useState(false);
  const [lessThan300, setLessThan300] = useState(false);
  const [newOnSwiggy, setNewOnSwiggy] = useState(false);

  const loaderRef = useRef(null);

  useEffect(() => {
    fetch("/restaurants.json")
      .then((res) => res.json())
      .then((data) => {
        const repeated = Array(10).fill(data).flat();
        setAllRestaurants(repeated);
        setVisibleCount(8);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (!footerRef?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, [footerRef]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          !isLoadingMore &&
          !isFooterVisible &&
          visibleCount < filteredRestaurants.length
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

  const togglePureVeg = () => {
    setIsPureVeg((prev) => !prev);
  };

  const toggleGoodRating = () => {
    setGoodRating((prev) => !prev);
  };

  const selectedFiltersCount = [
    isPureVeg,
    goodRating,
    fastDelivery,
    lessThan300,
    newOnSwiggy
  ].filter(Boolean).length;

  let filteredRestaurants = allRestaurants.filter((res) => {
    const isVegOk = isPureVeg ? res.veg === "pure" : true;
    const isRatingOk = goodRating ? parseFloat(res.rating) >= 4 : true;
    const isFastOk = fastDelivery ? parseInt(res.minTime) <= 25 : true;
    const isUnder300 = lessThan300 ? parseInt(res.price) < 300 : true;
    const isNew = newOnSwiggy ? res.new === true : true;
    return isVegOk && isRatingOk && isFastOk && isUnder300 && isNew;
  });

  switch (selectedSort) {
    case "rating":
      filteredRestaurants.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    case "delivery":
      filteredRestaurants.sort((a, b) => parseInt(a.minTime) - parseInt(b.minTime));
      break;
    case "lowToHigh":
      filteredRestaurants.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      break;
    case "highToLow":
      filteredRestaurants.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      break;
    case "relevance":
    default:
      break;
  }

  return (
    <div className="online-container">
      <h2>Restaurants with online food delivery in {city}</h2>

      {/* Filter Buttons */}
      <div className="buttons">
        <button className="filter-btn-with-count">
          Filter
          {selectedFiltersCount > 0 && (
            <span className="filter-count-badge">{selectedFiltersCount}</span>
          )}
          <LuGitPullRequest style={{ transform: "rotate(90deg)", marginLeft: "4px" }} />
        </button>

        {/* Sort By with Dropdown */}
        <div className="sort-dropdown">
          <button onClick={() => setShowSortOptions(!showSortOptions)}>
            Sort By <RxCaretDown style={{ marginLeft: "4px" }} />
          </button>

          {showSortOptions && (
            <div className="sort-popup">
              {["relevance", "delivery", "rating", "lowToHigh", "highToLow"].map((key) => (
                <div
                  key={key}
                  className="sort-option"
                  onClick={() => setSelectedSort(key)}
                >
                  <span className={`circle ${selectedSort === key ? "selected" : ""}`}></span>
                  {key === "relevance" && "Relevance (Default)"}
                  {key === "delivery" && "Delivery Time"}
                  {key === "rating" && "Rating"}
                  {key === "lowToHigh" && "Cost: Low to High"}
                  {key === "highToLow" && "Cost: High to Low"}
                </div>
              ))}
              <button className="apply-btn" onClick={() => setShowSortOptions(false)}>Apply</button>
            </div>
          )}
        </div>

        <button
          className={fastDelivery ? "active-filter" : ""}
          onClick={() => setFastDelivery((prev) => !prev)}
        >
          Fast Delivery
        </button>

        <button
          className={newOnSwiggy ? "active-filter" : ""}
          onClick={() => setNewOnSwiggy((prev) => !prev)}
        >
          New on Swiggy
        </button>

        <button
          className={goodRating ? "active-filter" : ""}
          onClick={toggleGoodRating}
        >
          Ratings 4.0+
        </button>
        <button
          className={isPureVeg ? "active-filter" : ""}
          onClick={togglePureVeg}
        >
          Pure Veg
        </button>
        <button>Offers</button>
        <button>Rs.300-Rs.600</button>
        <button
          className={lessThan300 ? "active-filter" : ""}
          onClick={() => setLessThan300((prev) => !prev)}
        >
          Less than Rs.300
        </button>
      </div>

      {/* Restaurant Cards */}
      <div className="restaurant-grid">
        {filteredRestaurants.slice(0, visibleCount).map((res, i) => (
          <div className="restaurant-card" key={i}>
            {!loadedImages[i] && <div className="img-loader"></div>}
            <img
              src={res.image}
              alt={res.name}
              style={{ display: loadedImages[i] ? "block" : "none" }}
              onLoad={() => handleImageLoad(i)}
            />
            <h3>{res.name}</h3>
            <p>⭐ {res.rating} | ⏱ {res.minTime}min - {res.maxTime}min</p>
            <p className="offer">{res.offer}</p>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {visibleCount < filteredRestaurants.length && (
        <div ref={loaderRef} className="scroll-loader">
          {isLoadingMore && <p>Loading more...</p>}
        </div>
      )}
    </div>
  );
}
