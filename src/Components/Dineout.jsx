import React, { useEffect, useState } from 'react'
import './Dineout.css'
import { useParams } from 'react-router-dom'

const Dineout = () => {
    const {id} = useParams();
    const [dineout, setDineout] = useState([]);
    
    

     useEffect(()=>{
            fetch('/dineout.json')
            .then((res)=>res.json())
            .then((res)=>setDineout(res))
            console.log(dineout, "dineout list")
        },[])

    const dineoutRes = dineout?.find(res => String(res.id) === id)
    console.log(dineoutRes, "this is current dineout res")
  return (
    <div className='dineout-page'>
        <p className='dineout-res-name'>{dineoutRes?.name}</p>
        <div className='dineout-filter' >
            <p>Dineout</p>
            <p>Photos</p>
            <p>Menu</p>
        </div>

        <hr className='dineout-hr'/>

        <div className='dineout-img'
        style={{
            backgroundImage: `url(${dineoutRes?.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center" 
        }}>
            <div className='info-container'>
                <div className='rating-price'>
                    <p>{dineoutRes?.rating}</p> 
                    <p>10K + in google</p>
                    <p>{dineoutRes?.priceForTwo} for two</p>
                </div>
                <div className='res-name'>{dineoutRes?.name}</div>
                <div className='res-location'>{dineoutRes?.address}</div>
                <div className='open-now'><span className='time-for-open'>Open now</span> OPEN TILL 11:59PM</div>

                <div className='dineout-hr-line'></div>
                <div className='get-access'>
                    <p>Book Table</p>
                    <p>Call</p>
                    <p>Direction</p>
                </div>

                 
            </div>
        </div>

        <hr/>
        <div>
            
        </div>
    </div>
  )
}

export default Dineout