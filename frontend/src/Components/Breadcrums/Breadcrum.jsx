import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        HOME 
        <img src={arrow_icon} alt="arrow_icon" width="15" height="15"/> 
        SHOP 
        <img src={arrow_icon} alt="arrow_icon" width="15" height="15"/> {product.category} 
        <img src={arrow_icon} alt="arrow_icon" width="15" height="15"/>
        {product.name}        
    </div>
  )
}

export default Breadcrum