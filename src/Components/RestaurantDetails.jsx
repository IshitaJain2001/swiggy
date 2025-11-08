import { useEffect, useState } from "react";
import img1 from "/assets/northindian.avif";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import { useParams } from "react-router-dom";
import "./RestaurantDetails.css";

export default function RestaurantDetails() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const cartVal = useSelector((state) => state.cartDetails.count);
  const dispatch = useDispatch();
  const [showbanner, setShowbanner] = useState(false);

  const { restaurant } = useParams();

  const [resDetail, setResDetail] = useState([]);

  useEffect(() => {
    fetch("/restaurants.json")
      .then((res) => res.json())
      .then((res) => setResDetail(res));
  }, []);

  const findRestaurant = resDetail.find(
    (item) => item.title.toLowerCase() === restaurant.toLowerCase()
  );

  console.log(findRestaurant, "this is res detail page");

  const options = [
    "Tandoori Chaap Tikka [14 Pcs]",
    "Afghani Chaap Tikka [14 Pcs]",
    "Paneer Tikka [10 Pcs]",
    "Hariyali Chaap Tikka [14 Pcs]",
  ];
  useEffect(() => {
    setShowbanner(true);
  }, [cartVal]);

  const {
    title,
    state,
    rating = 4.5,
    ratingsCount = 899,
    priceForTwo = 400,
    category = "Indian",
    outlet = "Janpath",
    timeRange = "25-30 mins",
  } = restaurant;

  return (
    <div className="resDetail-page">
      {!findRestaurant ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className="home-title">
            Home / {findRestaurant.state} / {findRestaurant.title}
          </p>
          <h2 className="restaurant-name">{findRestaurant.title}</h2>

          <div className="restaurant-info-card">
            
              <div className="rating-text">
                <div className="score">{rating}</div>
                <div className="count">({ratingsCount} ratings)</div>
                <div className="price-two">
                  ₹{priceForTwo} <span className="for-two">for two</span>
                </div>
              </div>
            <p className="category-link">{category}</p>

           
              <div className="meta">
                <div className="timeline-dot" />
                <div className="outlet-text">
                  <div >
                    <strong>Outlet  :  </strong>{" "}
                    <span className="outlet-name">{outlet}</span>
                  </div>
                  <div className="time-range">
                    <strong>{timeRange}</strong>
                  </div>
                </div>
              </div>
            
          </div>

          <div className="special-offers">
            <p>special offers goes here,......</p>
          </div>

          <p className="menu">Menu</p>
          <input type="text" placeholder="search for dishes" className="search-items"/>

          <div className="filter-btns">
              <button>
                Pure Veg
              </button>
              <button>
                Bestseller
              </button>
          </div>

          <hr/>

          <h2 className="">get your teast</h2>

          {/* maping the items of restaurant */}
          <div>
            {
              findRestaurant && 
              findRestaurant.offer_items.map((item, index)=>(
                <div key={index} >
                  <div className="food-item">
                    <div className="details">
                      <h3>{item.name}</h3>
                      <p>rs. {item.price}</p>
                      <p className="food-description">{item.description}</p>
                    </div>
                    <div className="img">
                      <img src={item.image} alt="img"/>
                      <button
                      onClick={() => {
                        dispatch({
                          type: "ADDED_TO_CART",
                            payload: {
                              items: item.name,
                              price: item.price,
                            },
                          });
                        }} 
                      className="add-to-cart">ADD  +</button>
                    </div>
                  </div>
                  <hr className="hr-line"/>
                </div>
              ))
            }
           
          </div>
        </div>
      )}
    </div>
  );
}

// <>
//   <div className="northindianfood-list">
//     <img src={img1} alt="" style={{ width: "300px" }} />
//     <p>₹249</p>
//     <button onClick={() => setShowPopup(true)}>Add to Cart</button>
//   </div>

//   {showPopup && (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "rgba(0,0,0,0.5)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         zIndex: 999,
//       }}
//     >
//       <div
//         style={{
//           background: "#fff",
//           padding: "20px",
//           borderRadius: "10px",
//           width: "400px",
//           maxWidth: "90%",
//         }}
//       >
//         <h3>Choose Ur Snacks With 2 Rumali Roti • ₹249</h3>
//         <p>Customise as per your taste</p>
//         <p>Choose Any 1 (0/1)</p>

//         {options.map((option, index) => (
//           <label
//             key={index}
//             style={{ display: "block", marginBottom: "10px" }}
//           >
//             <input
//               type="radio"
//               name="snack"
//               value={option}
//               checked={selectedOption === option}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               style={{ marginRight: "10px" }}
//             />
//             {option}
//           </label>
//         ))}

//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginTop: "20px",
//           }}
//         >
//           <p style={{ fontWeight: "bold", fontSize: "18px" }}>₹249.00</p>
//           <button
//             onClick={() => {
//               dispatch({
//                 type: "ADDED_TO_CART",
//                 payload: {
//                   items: "north-indian thali",
//                   price: 249,
//                 },
//               });
//               setShowPopup(false);
//             }}
//             style={{
//               backgroundColor: "#06c167",
//               color: "white",
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "5px",
//             }}
//           >
//             Add Item to cart
//           </button>
//         </div>
//       </div>
//     </div>
//   )}
//   <Notification />
// </>
