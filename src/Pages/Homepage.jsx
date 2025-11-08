import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { MdArrowOutward } from "react-icons/md";


import './Homepage.css'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Category from '../Components/Category';
import getApp from '../assets/get-app.png'
import Footer from '../Components/Footer'; 

import RestaurantImg from '../assets/food-delivery1.png';
import dineoutImg from '../assets/dineout1.png';

import instamartImg from '../assets/instamart1.png';


import left from '../assets/Veggies_left.png'
import right from '../assets/Sushi_right.png'
import { BiSolidOffer } from "react-icons/bi";
import { MdStars } from "react-icons/md";



const Homepage = () => {
  const [item, setItems] = useState([]);
  useEffect(() => {
    async function getData() {
      let res = await fetch("/category.json");
      let data = await res.json();
      setItems(data);
      console.log(item, "tisdfnidsfn");
    }
    getData();
  }, []);


  // fetcing groceries data
  const [groceries, setGroceries] = useState([]);
  useEffect(() => {
    async function getData() {
      let res = await fetch("/groceries.json");
      let data = await res.json();
      setGroceries(data);
    }
    getData();
  }, []);


  // fetching dineout data
  const [dineout, setDineout] = useState([]);
  useEffect(() => {
    async function getData() {
      let res = await fetch("/dineout.json");
      let data = await res.json();
      setDineout(data);
    }
    getData();
  }, []);

  const scrollRef = useRef();

  return (
    <div className='homapage'>
      {/***navbar and herosection */}
      <div className='hero-part '>

        <img src={left} alt='left' className='vegImgLeft'/>
        <img src={right} alt='right' className='vegImgRight'/>
        {/* Navbar */}
        <nav className="home-navbar">
          <Link to='/' className="home-navbar-logo-container">
            <div className='logo-border'>
                <img src={logo} alt="swiggy logo" className="home-navbar-logo" />
            </div>
            

            <h2 className="nav-swiggy">Swiggy</h2>
          </Link>
          <div className="home-navbar-links">
            <button className='nav-btn'>Swiggy Corporate</button>
            <button className='nav-btn'>Partner with us</button>
            <button className='nav-btn nav-btn-get'>
              <p>Get the App</p>
              {/* <MdArrowOutward /> */}
            </button>
            <button className='nav-btn nav-btn-signin'>Sign in</button>
          </div>
        </nav>


        {/* hero section */}
        <div className="text-container">
          <div className="text">
            Order food & groceries. Discover best restaurants. Swiggy it!
          </div>
          <div className="search-container">
            <div className="location">
              <FaLocationDot className="swiggy-icon" />
              <input type='text' placeholder='Enter your delivery location'/>
              <FiChevronDown className='arrow-down'/>
            </div>
            <Link to="/search" className="search-container-text">
              <p>Search for restaurants, items or more</p>
              <IoSearchOutline />

            </Link>
          </div>
        </div>


        {/**routes */}
        <div className="routes">
          <Link to="/restaurants">
            <img src={RestaurantImg} alt="delivery" />
          </Link>
          
          <Link to='/instamart'>
            <img src={instamartImg} alt="instamart" />
          </Link>
          <Link to='/dineout'>
            <img src={dineoutImg} alt="dineout" />
          </Link>
          
        </div>
      </div>


      {/* best food option carousel */}
      <div className='best-food-carousel'>
        <div className="category-container-home">
          <div className="mind-container-home">
            <h2 >Order our best food options</h2>
            <div className="arrows-home">
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
        <div className="category-containerr-home">
          <div className="items-home" ref={scrollRef}>
            {item.length > 0 ? (
              item.map((food, index) => {
                return (
                  <Link className='ek-food-item' key={index} to={`/restaurants/${food.path}`}>
                    {" "}
                    <img src={food.image} alt="" />{" "}
                  </Link>
                );
              })
            ) : (
              <p>nothing</p>
            )}
          </div>
        </div>
      </div>


      {/**groceries carousel */}
      <div className='groceries'>
          <div>
            <div  className="category-container-groceries">
              <div className="mind-container-groceries">
              <h2>Shop groceries on Instamart</h2>
              <div className="arrows-groceries">
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
          <div className="category-containerr-groceries">
            <div className="items-groceries" ref={scrollRef}>
              {groceries.length > 0 ? (
                groceries.map((food, index) => {
                  return (
                    <Link key={index} to=''>
                      {" "}
                      <img src={food.image} alt="" />{" "}
                      <p>{food.title}</p>
                    </Link>
                  );
                })
              ) : (
                <p>nothing</p>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* dineout carousel */}
      <div className='dineout'>
        <div className="category-container-dineout">
          <div className="mind-container-dineout">
            <h2>Discover best restaurants on Dineout</h2>
            <div className="arrows-home-dineout">
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
        
        <div className="category-containerr-dineout">
          <div className="items-dineout" ref={scrollRef}>
            {dineout.length > 0 ? (
              dineout.map((food, index) => {
                return (
                  <div className='item-dineout' key={index}>
                       <Link key={index} to={`/dineout/${food.id}`}>
                        <div className="item-dineout">
                          <img
                            src={food.image}
                            alt={food.name}
                            style={{
                              width: "100%",
                              height: "200px",
                              borderTopLeftRadius: "10px",
                              borderTopRightRadius: "10px",
                              objectFit: "cover"
                            }}
                          />
                          <div style={{ padding: "10px" }}>
                            <div className='name-and-reating'>
                              <h3 className='food-name'>{food.name}</h3>
                              <p className='rating'><MdStars className='rating-icon' /> {food.rating}</p>
                            </div>

                            <div className='add-and-distance'>
                              <p>{food.address}</p>
                              <div className='price-and-dis'>
                                <p>₹{food.priceForTwo} for two</p>
                                <p>{food.distance}</p>
                              </div>
                            </div>
                            {
                              food.tableBooking ?
                              <div className='table-booking'>

                                <p className='table-booking-text'>Table booking</p>
                              </div> :
                              <div>table not availavle</div>
                            }

                            
                            
                            {food.specialOffers.length > 0 && (
                              <div className='specialOffers'>
                              <div className='discount-icon'>
                                <BiSolidOffer />{food.specialOffers[0]}
                              </div>
                              
                              <p className='more-text'>+2 more</p>
                              </div>
                            )}


                            {food.bankOffers.length > 0 && (
                              <div className='bankOffers'>
                                {food.bankOffers[0]}
                              </div>
                            )}

                            
                          </div>
                        </div>
                      </Link>
                  </div>
                 
                );
              })
            ) : (
              <p>nothing</p>
            )}
          </div>
        </div>
      </div>  

      {/* get app banner  */}
      <div className='banner'>
        <img src={getApp} alt='get app banner'  className="full-width-image" />
      </div>


      {/* <div className="cuisine-grid">
          {[
            "Chinese",
            "South Indian",
            "Indian",
            "Kerala",
            "Korean",
            "North Indian",
            "Seafood",
            "Bengali",
            "Punjabi",
            "Italian",
            "Andhra",
          ].map((type, index) => {
            const slug = type.toLocaleLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={index}
                to={`/restaurants-page/${slug}-restaurant-near-me`}
              >
                <button key={index} className="cuisine-btn">
                  {type} Restaurant Near Me
                </button>
              </Link>
            );
          })}
        
          <button className="cuisine-btn orange-btn">Show More ⌄</button>
        </div> */}

        <Footer/>
    </div>
  );
};

export default Homepage;