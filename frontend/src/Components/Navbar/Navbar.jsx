import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cartIcon from '../Assets/basket.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import hamburger_icon from '../Assets/menus.png'

const Navbar = () => {

const [menu,setMenu] = useState("shop");
const {getTotalCartItems} = useContext(ShopContext)
const menuRef = useRef();

const hamburgerToggle = (e) =>{
  menuRef.current.classList.toggle('nav-menu-visible');
  e.target.classList.toggle('open');
}


  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo_icon" width="50" height="50"/>
        <p>Wolfy</p>
      </div>
        <img className='hamburger-icon' onClick={hamburgerToggle} src={hamburger_icon} alt="hamburger_icon" width="50" height="45"/>
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={()=>setMenu("shop")}><Link to='/' style={{textDecoration:'none'}}>Shop</Link> {menu==="shop"? <hr/>: <></>}</li>
        <li onClick={()=>setMenu("men")}><Link to='/men' style={{textDecoration:'none'}}>Men</Link> {menu==="men"? <hr/>: <></>}</li>
        <li onClick={()=>setMenu("women")}><Link to='/women' style={{textDecoration:'none'}}>Women</Link> {menu==="women"? <hr/>: <></>}</li>
        <li onClick={()=>setMenu("kids")}><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link> {menu==="kids"? <hr/>: <></>}</li>
      </ul>
      <div className='nav-login-cart'>
        <Link to='/LoginSignup'>{localStorage.getItem('auth-token') 
             ?<button onClick={()=>{
              localStorage.removeItem('auth-token');
              window.location.replace('/');
              setMenu("");
              }}>Logout
              </button> 
             :<button onClick={()=>{setMenu("")}}>Login</button>}</Link>
        <Link to='/Cart'><img src={cartIcon} alt="cart-icon" width="40" height="40" onClick={()=>{setMenu("")}}/></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar