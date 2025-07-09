import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    async function getData() {
      let data1 = await fetch("./category.json");
      let res1 = await data1.json();
      let data2 = await fetch("./restaurants.json");
      let res2 = await data2.json();
    
      setData([...res1, ...res2]);
    }
    getData();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFiltered([]);
      return;
    }

    const searchTermLower = search.toLowerCase();

    const result = data.filter((item) => {
          const searchTermLower = search.toLowerCase();
      const titleMatch = (item.title || "").toLowerCase().includes(searchTermLower);
      const nameMatch = (item.name || "").toLowerCase().includes(searchTermLower);
      const itemsMatch = Array.isArray(item.items)
        ? item.items.some((i) => i.toLowerCase().includes(searchTermLower))
        : false;

      return titleMatch || nameMatch || itemsMatch;
    });

    // ✅ Move this inside useEffect
    setFiltered(result);

  }, [search, data]);

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search restaurants or food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "5px"
        }}
      />

      {filtered.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, marginTop: "10px" }}>
          {filtered.map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#f1f1f1",
                padding: "10px",
                marginBottom: "5px",
                borderRadius: "5px"
              }}
            >
             {item.title ? item.title : item.name}
{item.items && (
  <div style={{ fontSize: "12px", color: "#888" }}>
    Items: {item.items.join(", ")}
  </div>
)}

              <span style={{ fontSize: "12px", color: "gray" }}>
                ({item.title ? "restaurant" : "food item"})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
