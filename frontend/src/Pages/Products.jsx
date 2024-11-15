import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Products = () => {

  const {allProducts} = useContext(ShopContext)
  const {productId} = useParams();
  const product = allProducts.find((e)=> e.id=== Number(productId))

  return (
    <div className='products'>
      <Breadcrum product ={product}/>
      <ProductDisplay product = {product}/>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Products