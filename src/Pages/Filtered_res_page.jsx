import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './Filtered_res.css'
import { MdStars } from "react-icons/md";



const Filtered_res_page = () => {

    const {category} = useParams()
    const [data, setData] = useState([])

    useEffect(()=>{
        fetch('/restaurants.json')
        .then((res)=>res.json())
        .then((res)=>setData(res))
    },[])

    const cleanCategory = category.replace("-restaurant-near-me", "")

    const categoryFilteredres = data?.filter((item)=> item.category.includes(cleanCategory) )

    //console.log(category, "this is parame data ")


//     const cleanCategory = category.replace("-restaurant-near-me", "").toLowerCase();

// const categoryFilteredres = data?.filter((item) =>
//   item.category.some((cat) => cat.toLowerCase() === cleanCategory)
// );


    console.log(categoryFilteredres, "inside filtered res page and got the filtered res data")
  return (
    <div className='filtered_page'>
      <h1 className='res-heading'>
        {category.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ').replace(/-/g, ' ')}
      </h1>
      <p className='res-text'>
        Satisfy your cravings with these fluffy & flavoursome breads paired with
        Chole.
      </p>
      <div className='filter-btns'>
        <button>Filter</button>
        <button>short By</button>
        <button>10 Min Delivery</button>
      </div>

      <div className='res-head-text'>Restaurants to explore</div>

      

      {/* restaurants listed herer */}
      <div className="restaurants-list">
        {categoryFilteredres.length > 0 ? (
          categoryFilteredres.map((item) => (
            <Link key={item.id} to={`/restaurants/${category}/${item.title}`}>
              <div className="new-restaurant-card">
                {/* Offer Item Image */}

                {/* as of now using static image for testing */}
                {item.category.length > 0 && (
                  <img
                    src={item.category_img}
                    alt='res-category-img'
                  />
                )}
                 {/* <img src="/assets/res1.avif" alt="res-img" /> */}

                {/* Restaurant Details */}
                <div className="restaurant-details">
                  <h3 className='res-detail-name'>{item.title}</h3>
                  <div className="details-row">
                    <span className='rating-container'><MdStars className='rating-icon1' /> {item.rating}</span>
                    <span>
                      • {item.minTime}-{item.maxTime} mins
                    </span>
                  </div>
                  <p className='item-names'>{item.name}</p>
                  <p className='res-location'>{item.place}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No restaurants found...</p>
        )}
      </div>
    </div>
  );
}

export default Filtered_res_page