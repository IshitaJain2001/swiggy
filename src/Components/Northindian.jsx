import { useEffect, useState } from "react";
import img1 from "/assets/northindian.avif";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";

export default function Northindian() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
const cartVal= useSelector((state)=>state.cartDetails.count)
const dispatch= useDispatch()
const [showbanner,setShowbanner]= useState(false)

  const options = [
    "Tandoori Chaap Tikka [14 Pcs]",
    "Afghani Chaap Tikka [14 Pcs]",
    "Paneer Tikka [10 Pcs]",
    "Hariyali Chaap Tikka [14 Pcs]",
  ];
useEffect(()=>{
setShowbanner(true)
},[cartVal])
  return (
    <>
      <div className="northindianfood-list">
        <img src={img1} alt="" style={{ width: "300px" }} />
        <p>₹249</p>
        <button onClick={() => setShowPopup(true)}>Add to Cart</button>
      </div>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h3>Choose Ur Snacks With 2 Rumali Roti • ₹249</h3>
            <p>Customise as per your taste</p>
            <p>Choose Any 1 (0/1)</p>

            {options.map((option, index) => (
              <label key={index} style={{ display: "block", marginBottom: "10px" }}>
                <input
                  type="radio"
                  name="snack"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                {option}
              </label>
            ))}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>₹249.00</p>
              <button
                onClick={() => {
                    dispatch({
                        type:"ADDED_TO_CART",
                        payload:{
                            items:"north-indian thali",
                            price: 249
                        }
                    })
                    setShowPopup(false)}}
                style={{
                  backgroundColor: "#06c167",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Add Item to cart
              </button>
            </div>
          </div>
        </div>
      )}
<Notification/>
    </>
  );
}
