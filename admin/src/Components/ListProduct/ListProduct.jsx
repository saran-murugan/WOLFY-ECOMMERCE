import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/close.png'

const ListProduct = () => {


  const [allProducts,setAllProducts] = useState([]);

  const fetchInfo = async () =>{
    await fetch('http://localhost:4000/allproducts').then((res) =>res.json()).then((data) =>{
      setAllProducts(data);
    })
  }
  useEffect(()=>{
    fetchInfo()
  },[])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product,index) => {
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-image" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeProduct(product.id)}} className='listproduct-remove-icon' src={remove_icon} alt="" width={20} height={20} />
          </div>
          <hr />
          </>
})}
      </div>
    </div>
  )
}

export default ListProduct