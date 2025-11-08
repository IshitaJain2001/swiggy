import React from 'react'
import './DineoutPage.css';
import Onlinerest from '../Components/Onlinerest';

const DineoutPage = () => {
  return (
    <div>
        {/***dineout page banner */}
       <div className='banner-img-container'>
            <img src='/assets/dineout_home.avif' alt='banner img' className='banner-img'/>
            <div className='dineout-img-text'>Explore Top Dining Out Restaurants in Delhi</div>
       </div>

    {/***filter in dineout */}
    <Onlinerest/>


    </div>
  )
}

export default DineoutPage