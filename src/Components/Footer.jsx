import "./Footer.css";
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import img from "../assets/logo.png"
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
          ].map((type, index) => (
            <button key={index} className="cuisine-btn">
              {type} Restaurant Near Me
            </button>
          ))}
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
        <div className="footer-logo">
          <img
            src={img}
            alt="Swiggy"
          />
          <p>© 2025 Swiggy Limited</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
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
            <h4>Contact us</h4>
            <ul>
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
            <h4>Legal</h4>
            <ul>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
              <li>Investor Relations</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Available in:</h4>
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
            <h4>Life at Swiggy</h4>
            <ul>
              <li>Explore with Swiggy</li>
              <li>Swiggy News</li>
              <li>Snackables</li>
            </ul>
            <h4>Social Links</h4>
            <div className="social-icons">
              <FaLinkedinIn />
              <FaInstagram />
              <FaFacebookF />
              <FaPinterestP />
              <FaTwitter />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
