import React, { useState } from 'react'
import './AddProduct.css'
import upload_btn from '../../assets/upload.png'


const AddProduct = () => {

  const [image,setImage] = useState(false);
  const [productDetails,setProductDetails] =useState({
    name:"",
    image:"",
    category:"women",
    new_price:"",
    old_price:""
  })

  //for image adding in the upload option
  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  // for adding products to the database
  const changeHandler = (e) =>{
    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const addProduct = async () =>{
    console.log(productDetails)
    let responseData;
    let product = productDetails;

    let formData = new FormData()
    formData.append('product',image);

    await fetch('https://wolfy-ecommerce.onrender.com/upload',{
      method:'POST',
      headers:{
        Accept:'application/json'
      },
      body:formData,
    }).then((res) => res.json()).then((data) =>{responseData = data});

    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      await fetch('https://wolfy-ecommerce.onrender.com/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
      }).then((res)=>res.json()).then((data) =>{
        data.success?alert("Product added"):alert("Failed");
      })
    }
  }


  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
      </div>
      <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_btn} alt="upload_image" className='addproduct-thumbnail_img' width={90} height={90}/>
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
      </div>
      <button onClick={addProduct} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct