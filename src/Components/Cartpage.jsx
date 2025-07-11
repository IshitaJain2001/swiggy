import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const dispatch = useDispatch();
  const { food = [], price = [], quantity = [], count = 0 } =
    useSelector((state) => state.cartDetails || {});

  const totalPrice = quantity.reduce(
    (sum, q, i) => sum + q * price[i],
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart ({count} {count === 1 ? "item" : "items"})</h2>

      {count === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {food.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px"
              }}
            >
              <div>
                <p style={{ margin: 0 }}>{item}</p>
                <p style={{ margin: 0 }}>₹{price[index]}</p>
              </div>
              <div>
                <button onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: index })}>
                  -
                </button>
                <span style={{ margin: "0 10px" }}>{quantity[index]}</span>
                <button onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: index })}>
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {count > 0 && (
        <div style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}>
          Total: ₹{totalPrice}
        </div>
      )}
    </div>
  );
}
