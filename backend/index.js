const port = process.env.PORT || 4000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const path = require('path')
const cors = require('cors');
const { type } = require('os');

require('dotenv').config();


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded())

//Database connection with Mongodb
mongoose.connect(process.env.MONGODB_URI);


//API Creation

app.get("/",(req,res) => {
    res.send("Express App is Running")
})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage});

//Creating upload Endpoint for images


app.use('/images',express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res) =>{
    res.json({
        success:1,
        image_url: `https://wolfy-ecommerce.onrender.com/images/${req.file.filename}`
    })
})


  // Creating a schema named Product using mongoose

const Product = mongoose.model('Product', {
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true
    },
})


  // Creating API for adding a product

app.post("/addproduct", async (req,res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id +1;
    }
    else{
        id= 1;
    }

    // Make sure to use the image URL from the request body
    const productImageUrl = req.body.image;  // Use the image URL from the request

    // Validate if image URL is provided
    if (!productImageUrl) {
        return res.status(400).json({ success: false, error: "Image URL is required" });
    }


    const product = new Product({
        id: id,
        name: req.body.name,
        category:req.body.category,
        image:productImageUrl,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product);
    await product.save();
    console.log('saved')
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for deleting Products

app.post('/removeproduct', async (req,res) =>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log(`Product with id:${req.body.id} is removed`)
    //console.log("removed")
    res.json({
        success:true,
        name:req.body.name,
    })
})

//Creating API for Getting all products from the database
app.get('/allproducts', async (req,res) =>{
    let products = await Product.find({});
    console.log("All products fetched")
    res.send(products);
})

//Creating API for getting newcollections products
app.get('/newcollections',async (req,res) => {
    let products = await Product.find({});
    let new_collections = products.slice(1).slice(-8)
    console.log("Newcollection products fetched")
    res.send(new_collections);
})

//Creating API for getting popular in women products
app.get('/popularinwomen',async (req,res) => {
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("popular in women fetched")
    res.send(popular_in_women);
})


//Creating middleware to fetch user
const fetchUser = async (req,res,next) =>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    else{
        try{
        const data =jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user;
        next();
    } catch(error){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
}}
//creating endpoint for adding products in cart of each user
app.post('/addtocart',fetchUser,async(req,res) =>{
    console.log("added",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("added")
})


//creating endpoint for remove products in cart of each user
app.post('/removefromcart',fetchUser,async(req,res) =>{
    console.log("removed",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("added")
})

//creating endpoint to get cartdata when only logged in
app.post('/getcart',fetchUser,async(req,res) =>{
    console.log("GetCart")
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData)
})

// creating Schema for User Model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


//Creating End point for signup option
app.post('/signup', async (req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check) {
        return res.status(400).json({success:false,error:"Existing user found with same email address"})
    }
    let cart ={};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

     //JWT authentication
     const data = {
        user:{
            id:user.id
        }
     }
     const token = jwt.sign(data,process.env.JWT_SECRET)
     res.json({success:true,token})
})


//Creating endpoint for user login
app.post('/login', async(req,res) => {
    let user = await Users.findOne({email:req.body.email})
    if(user){
        let passCheck = user.password === req.body.password;
        if(passCheck){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,process.env.JWT_SECRET);
            res.json({success:true,token}) 
        }
        else{
            res.json({success:false,error:"Incorrect Password"})
        }
    }
    else{
        res.json({success:false,error:"Incorrect Email Address"})
    }
})


app.listen(port,(err)=>{
    if(!err){
        console.log('server running on port: '+port)
    }
    else{
        console.log('Error:'+err.message)
    }
})