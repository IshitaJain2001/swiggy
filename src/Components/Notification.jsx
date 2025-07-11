import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Notification() {
  const cartCount = useSelector((state) => state.cartDetails.count);
  const [show, setShow] = useState(false);
  const [prevCount, setPrevCount] = useState(cartCount);

  useEffect(() => {
    if (cartCount > prevCount) {
      setShow(true);
      setPrevCount(cartCount);

      const timer = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // ✅ This will not render anything in DOM
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#06c167",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      <span>{cartCount} {cartCount === 1 ? "item" : "items"} added</span>
      <span style={{ cursor: "pointer" }}>VIEW CART 🛒</span>
    </div>
  );
}
