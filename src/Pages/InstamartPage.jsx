import React, { useEffect, useState } from 'react'


const InstamartPage = () => {
    const [item, setItems] = useState([]);
      useEffect(() => {
        async function getData() {
          let res = await fetch("/dineout.json");
          let data = await res.json();
          setItems(data);
          console.log(item, "dineoiut data heree");
        }
        getData();
      }, []);
  return (
    <div>InstamartPage</div>
  )
}

export default InstamartPage