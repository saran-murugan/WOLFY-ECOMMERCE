import React from 'react'
import './Offers.css'
import exclusive_img from '../Assets/exclusive.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive<br/>Offers For You</h1>
            <p>ONLY ON BEST SELLER PRODUCTS</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exclusive_img} alt="exclusive-img" />
        </div>
    </div>
  )
}

export default Offers