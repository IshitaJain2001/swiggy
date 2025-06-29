import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import "./Category.css"
import { useEffect, useState } from "react";
export default  function Category(){
    const [item,setItems]= useState([])
    useEffect(()=>{
        async function getData(){
            let res= await fetch("/category.json")
            let data= await res.json()
setItems(data)

        }
        getData()
    },[])

   console.log(item);
   
    
    return(
        <>
        
       
<div className="category-container">
<div className="mind-container">
<h3>What's on your mind?</h3>
<div className="arrows">
    <button >
        <FaArrowLeft />
    </button>
    <button>
        <FaArrowRight />
    </button>
</div>
</div>


</div>
<div className="category-container">
<div className="items">
    {
        item.length>0?
        item.map((food,index)=>{
return(
    <img src={food.image} alt="" />
)
        })
        : <p>nothing</p>
    }
</div>
</div>


 </>
    )
 }