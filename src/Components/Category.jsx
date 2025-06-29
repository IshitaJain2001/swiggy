import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import "./Category.css"
import { useEffect, useRef, useState } from "react";
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
 const scrollRef= useRef()
   console.log(item);
   
    
    return(
        <>
        
       
<div className="category-container">
<div className="mind-container">
<h2>What's on your mind?</h2>
<div className="arrows">
    <button onClick={()=>scrollRef.current.scrollBy({left:-600, behavior:"smooth"})}>
        <FaArrowLeft />
    </button>
    <button onClick={()=>scrollRef.current.scrollBy({left:400, behavior:"smooth"})}>
        <FaArrowRight />
    </button>
</div>
</div>


</div>
<div className="category-containerr">
<div className="items" ref={scrollRef}>
    {
        item.length>0?
        item.map((food,index)=>{
return(
    <img src={food.image} alt="" key={index}/>
)
        })
        : <p>nothing</p>
    }
</div>
<hr />
</div>


 </>
    )
 }