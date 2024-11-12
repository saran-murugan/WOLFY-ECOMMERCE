import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import cart from '../../assets/trolley.png'
import list_item from '../../assets/pick-list.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to ='/addproduct' style={{textDecoration:'none'}}>
            <div className='sidebar-item'>
                <img src={cart} alt="" width={45} height={45}/>
                <p>Add Product</p>
            </div>
        </Link>
        <Link to='/listproduct' style={{textDecoration:"none"}}>
            <div className='sidebar-item'>
                <img src={list_item} alt="" width={45} height={45}/>
                <p>List Product</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar