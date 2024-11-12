import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav-left'>
            <img src={logo} alt="logo_icon" width="60" height="60"/>
            <div className='nav-info'>
                <p className='nav-name'>Wolfy</p>
                <p style={{color:'red'}}>Admin Panel</p>
            </div>
        </div>
        <img src={logo} alt="" width='60' height="60" style={{borderRadius:'50%',border:'3px solid grey'}}/>

    </div>
  )
}

export default Navbar