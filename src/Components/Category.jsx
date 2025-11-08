import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import "./Category.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Restaurants from "./Restaurants";
export default function Category() {
  const [item, setItems] = useState([]);
  const [res, setRes] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    async function getData() {
      let res = await fetch("/restaurants.json");
      let data = await res.json();
      setRes(data);
      console.log(res, "sldfjdsfsdfsdjfsd res data")
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      let res = await fetch("/category.json");
      let data = await res.json();
      setItems(data);
    }
    getData();
  }, []);
  const scrollRef = useRef();
  return (
    <>
      <div className="category-container">
        <div className="mind-container">
          <h2>What's on your mind?</h2>
          <div className="arrows">
            <button
              onClick={() =>
                scrollRef.current.scrollBy({ left: -600, behavior: "smooth" })
              }
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() =>
                scrollRef.current.scrollBy({ left: 600, behavior: "smooth" })
              }
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="category-containerr">
        <div className="items" ref={scrollRef}>
          {item.length > 0 ? (
            item.map((food, index) => {
              return (
                <Link key={index} to={`/restaurants/${food.path}`}>
                <div className="one-item">
                  
                  <img src={food.image} alt="" />
                </div>
                  
                </Link>
              );
            })
          ) : (
            <p>nothing</p>
          )}
        </div>
        <hr />
      </div>
    </>
  );
}
