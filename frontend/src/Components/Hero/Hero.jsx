import React from 'react'
import './Hero.css'
import arrow_png from '../Assets/right-arrow1.png'
import hero_img2 from '../Assets/heroimg2.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div className='hero-text'>
                <p>new<br/>Collections<br/>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_png} alt="arrow-img" height="15px" width="15px"/>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img2} alt="hero-img2" />
        </div>
    </div>
    )
}

export default Hero