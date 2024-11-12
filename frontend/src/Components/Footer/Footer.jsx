import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import insta_logo from '../Assets/instagram.png'
import watsapp_logo from '../Assets/watsapp.png'
import pinterest_logo from '../Assets/pinterest.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="footer-logo" width="70" height="70"/>
            <p>WOLFY</p>
        </div>
        <ul className='footer-links'>
            <li>Company</li>
            <li>Products</li>
            <li>Franchise</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={insta_logo} alt="footer-icon" width="50" height="50"/>
            </div>
            <div className="footer-icons-container">
                <img src={pinterest_logo} alt="footer-icon" width="50" height="50"/>
            </div>
            <div className="footer-icons-container">
                <img src={watsapp_logo} alt="footer-icon" width="50" height="50"/>
            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2024 - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer