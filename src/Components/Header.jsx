//    import img from "../assets/logo.png" 
//  import { RxCaretDown } from "react-icons/rx";
//  import { BiSolidOffer } from "react-icons/bi";
//  import { IoHelpBuoyOutline } from "react-icons/io5";
//  import { SlUser } from "react-icons/sl";
//  import { CiSearch } from "react-icons/ci";
//  import { IoCartOutline } from "react-icons/io5";
//  import { TbCurrentLocation } from "react-icons/tb";
//  import { RxCross1 } from "react-icons/rx";
//  import "./Header.css"
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

//  export default function Header(){
//  const [toggle,setToggle]=  useState(false)

//  const [position,setPosistion] = useState({
//   latitude:"",
//   longitude:""
//  })
// const dispatch= useDispatch()


// const getCurrentLocation = () => {
//   if (!navigator.geolocation) {
//     alert("Geolocation not supported by your browser.");
//     return;
//   }

//   navigator.geolocation.getCurrentPosition(
//     async (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       let positions= {
//         latitude,longitude
//       }
//       localStorage.setItem("coordinates", JSON.stringify(positions));

// dispatch({
// type:"ADD_LOCATION",
//  payload: JSON.parse(localStorage.getItem("coordinates"))
// })
//       try {
//         const response = await fetch(
//           `https://us1.locationiq.com/v1/reverse.php?key=pk.9722e4fef2206d625da690ca02372950&lat=${latitude}&lon=${longitude}&format=json`
//         );
// const data = await response.json();
//        const address = data.address || {};
// const city =
//           address.suburb ||address.neighbourhood ||address.city_district ||address.city ||address.town 
//           ||address.village ||address.county ||"Unknown";
// const state = address.state || "";
//         const country = address.country || "";
// const locationString = `${city}, ${state}, ${country}`;
//         alert(`📍 Your location: ${locationString}`);
// localStorage.setItem("location", locationString);
// dispatch({
//           type: "ADD_CITY",
//           payload: state || "Unknown",
//         });
//       } catch (error) {
//         console.error("❌ Error fetching location:", error);
//         alert("Could not fetch location details.");
//       }
//     },
//     (error) => {
//       alert("Location access denied or unavailable.");
//       console.error(error);
//     }
//   );
// };




//     return(
//         <>
        
// <div className="overlay" style={{display: toggle? "block" :"none"}} onClick={() => setToggle(false)}>
// <div
//    className="location-overlay"
 
//     onClick={(e) => e.stopPropagation()} 
//   >
//     <div onClick={() => setToggle(false)}>
//         <RxCross1 />
//         </div> 

//     <div>
//         <input type="text" placeholder="Search for area, street name..."/>
//         </div> 

//     <div onClick={getCurrentLocation} style={{cursor:"pointer"}} >
//         <TbCurrentLocation />
//        <h3>
//         Get Current Location
//         </h3> 
//         <p style={{opacity:"0.7"}}>Using GPS</p>
//     </div>
//   </div>
// </div>



//         <header className="header">

//             <div className="logo">
// <img src={img} alt="" />

// <p>
//   {
//   localStorage.getItem("location")? localStorage.getItem("location")
//   : "Set Up Your Precise Location"
//   }
//    <button onClick={()=>setToggle(true)} style={{fontSize:"20px", cursor:"pointer"}}> <RxCaretDown /> </button>
// </p>
//             </div>


//             <div className="icons">
//                <Link to="/search"> <div className="search icon">
// <CiSearch /> 
// <p>Search</p>
//                 </div> </Link> 

// <div className="offers icon">
// <BiSolidOffer />
// <p>Offers <sup style={{color:"#fc8019"}}>new</sup></p>
// </div>

// <div className="help icon">
//     <IoHelpBuoyOutline />
//     <p>Help</p>
// </div>

// <div className="signin icon">
//     <SlUser />
//     <p>Sign In</p>
// </div>

// <div className="cart icon">
//     <IoCartOutline />
//     <p>Cart <sup>0</sup></p>
// </div>
//             </div>

//         </header>
//         </>
//     )
//  }

import img from "../assets/logo.png";
import { RxCaretDown, RxCross1 } from "react-icons/rx";
import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline, IoCartOutline } from "react-icons/io5";
import { SlUser } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { TbCurrentLocation } from "react-icons/tb";
import "./Header.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [position, setPosistion] = useState({
    latitude: "",
    longitude: "",
  });

  const dispatch = useDispatch();

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let positions = {
          latitude,
          longitude,
        };
        localStorage.setItem("coordinates", JSON.stringify(positions));

        dispatch({
          type: "ADD_LOCATION",
          payload: JSON.parse(localStorage.getItem("coordinates")),
        });

        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=pk.9722e4fef2206d625da690ca02372950&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const address = data.address || {};
          const city =
            address.suburb ||
            address.neighbourhood ||
            address.city_district ||
            address.city ||
            address.town ||
            address.village ||
            address.county ||
            "Unknown";
          const state = address.state || "";
          const country = address.country || "";
          const locationString = `${city}, ${state}, ${country}`;
          alert(`📍 Your location: ${locationString}`);
          localStorage.setItem("location", locationString);
          dispatch({
            type: "ADD_CITY",
            payload: state || "Unknown",
          });
        } catch (error) {
          console.error("❌ Error fetching location:", error);
          alert("Could not fetch location details.");
        }
      },
      (error) => {
        alert("Location access denied or unavailable.");
        console.error(error);
      }
    );
  };

  return (
    <>
      {/* Location Overlay */}
      <div
        className="overlay"
        style={{ display: toggle ? "block" : "none" }}
        onClick={() => setToggle(false)}
      >
        <div className="location-overlay" onClick={(e) => e.stopPropagation()}>
          <div onClick={() => setToggle(false)}>
            <RxCross1 />
          </div>

          <div>
            <input type="text" placeholder="Search for area, street name..." />
          </div>

          <div onClick={getCurrentLocation} style={{ cursor: "pointer" }}>
            <TbCurrentLocation />
            <h3>Get Current Location</h3>
            <p style={{ opacity: "0.7" }}>Using GPS</p>
          </div>
        </div>
      </div>

      {/* Login Drawer */}
      {showLogin && (
        <div className="login-overlay" onClick={() => setShowLogin(false)}>
          <div className="login-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="login-close" onClick={() => setShowLogin(false)}>
              <RxCross1 />
            </div>
            <div className="login-content">
              <h2>Login</h2>
              <p style={{ color: "#fc8019", marginTop: "-12px" }}>
                or create an account
              </p>
              <hr style={{ margin: "10px 0" }} />
              <input
                type="text"
                placeholder="Phone number"
                className="login-input"
              />
              <button className="login-button">LOGIN</button>
              <p style={{ fontSize: "12px", opacity: 0.7 }}>
                By clicking on Login, I accept the{" "}
                <b>Terms & Conditions</b> & <b>Privacy Policy</b>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src={img} alt="" />
          <p>
            {localStorage.getItem("location")
              ? localStorage.getItem("location")
              : "Set Up Your Precise Location"}
            <button
              onClick={() => setToggle(true)}
              style={{ fontSize: "20px", cursor: "pointer" }}
            >
              {" "}
              <RxCaretDown />{" "}
            </button>
          </p>
        </div>

        <div className="icons">
          <Link to="/search">
            <div className="search icon">
              <CiSearch />
              <p>Search</p>
            </div>
          </Link>

          <div className="offers icon">
            <BiSolidOffer />
            <p>
              Offers <sup style={{ color: "#fc8019" }}>new</sup>
            </p>
          </div>

          <div className="help icon">
            <IoHelpBuoyOutline />
            <p>Help</p>
          </div>

          <div
            className="signin icon"
            onClick={() => setShowLogin(true)}
            style={{ cursor: "pointer" }}
          >
            <SlUser />
            <p>Sign In</p>
          </div>

          <div className="cart icon">
            <IoCartOutline />
            <p>
              Cart <sup>0</sup>
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
