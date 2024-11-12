import React, { createContext, useEffect, useState } from 'react'

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{


    const[cartItems,setCartItems] = useState(getDefaultCart());
    const[allProducts,setAllProducts] =useState([]);

    useEffect(()=>{
        fetch('https://wolfy-ecommerce.onrender.com/allproducts')
        .then((res)=>res.json())
        .then((data)=>setAllProducts(data));

        //for getcart from auth token when logged in
        if(localStorage.getItem('auth-token')){
            fetch('https://wolfy-ecommerce.onrender.com/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            }).then((res)=>res.json()).then((data)=> setCartItems(data))
        }} 
   ,[])

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://wolfy-ecommerce.onrender.com/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/formData',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            }).then((res)=>res.json()).then((data)=>
                console.log(data)
            )
        }
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://wolfy-ecommerce.onrender.com/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/formData',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            }).then((res)=>res.json()).then((data)=>
                console.log(data)
            )
        }
    }
    const getTotalCartAmount = () => {
        let totalAmount= 0;
        for(const item in cartItems)
            {
                if(cartItems[item]>0)
                    {
                        let itemInfo = allProducts.find((product)=> product.id === Number(item));
                        totalAmount += itemInfo.new_price * cartItems[item]
                    }
                }
                return totalAmount;
            }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]> 0){
                totalItem += cartItems[item]
            }
        }
        return totalItem
    }

    const contextValue ={getTotalCartItems,getTotalCartAmount,allProducts,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

