import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import img from "../assets/logo1.png"
import { Link } from "react-router-dom";
export default function Footer({ref}) {
  return (
    <footer className="footer" ref={ref}>
      {/* 🔸 Cuisines Section */}
      <div className="cuisine-wrapper">
        <h2 className="cuisine-title">Best Cuisines Near Me</h2>
        
        <div className="cuisine-grid">
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
                to={`/restaurants/${slug}-restaurant-near-me`}
              >
                <button key={index} className="cuisine-btn">
                  {type} Restaurant Near Me
                </button>
              </Link>
            );
          })}
        
          <button className="cuisine-btn orange-btn">Show More ⌄</button>
        </div>

        <h2 className="cuisine-title">Explore Every Restaurants Near Me</h2>
        <div className="cuisine-grid">
          <button className="cuisine-btn">Explore Restaurants Near Me</button>
          <button className="cuisine-btn">
            Explore Top Rated Restaurants Near Me
          </button>
        </div>
      </div>

      {/* 🔸 Footer Main Links */}
      <div className="footer-container">
        

          <div className="footer-links">
            <div className="footer-logo">
              <div className="footer-logo-container">
                  <div className="logo-img">
                    <img
                    src={img}
                    alt="Swiggy"
                  />
                  </div>
                  <h1>Swiggy</h1>
              </div>
              
              <p className="copyright-text">© 2025 Swiggy Limited</p>
            </div>

          <div className="footer-column">
            <div className="footer-links-tag">Company</div>
            <ul>
              <li>About Us</li>
              <li>Swiggy Corporate</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Swiggy Instamart</li>
              <li>Swiggy Dineout</li>
              <li>Swiggy Genie</li>
              <li>Minis</li>
              <li>Pyng</li>
            </ul>
          </div>

          <div className="footer-column">
            <div className="footer-links-tag">Contact us</div>
            <ul>
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
            <div className="footer-links-tag">Legal</div>
            <ul>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Investor Relations</li>
            </ul>
          </div>

          <div className="footer-column">
            <div className="footer-links-tag">Available in:</div>
            <ul>
              <li>Bangalore</li>
              <li>Gurgaon</li>
              <li>Hyderabad</li>
              <li>Delhi</li>
              <li>Mumbai</li>
              <li>Pune</li>
              <li>
                <select>
                  <option>679 cities</option>
                </select>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <div className="footer-links-tag">Life at Swiggy</div>
            <ul>
              <li>Explore with Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>
            <div className="footer-links-tag">Social Links</div>
            <div className="social-icons">
              <FaLinkedinIn />
              <FaInstagram />
              <FaFacebookF />
              <FaPinterestP />
              <FaTwitter />
            </div>
          </div>
          
          </div>

          <div className="footer-horizontal-line"></div>

          <div className="app-download-conatiner">
            <div className="app-download-text">
              For better experience, download the Swiggy app now

            </div>
            <div className="app-download-img-container">
              <img src="./assets/androidApp.avif" alt="android app download" />

              <img src="./assets/iosApp.avif" alt="ios app download" />
            </div>
          </div>
      </div>
    </footer>
  );
}
