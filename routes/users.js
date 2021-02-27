const express = require('express');
const User = require('../models/User');
const Cart = require('../models/Cart')
const router = express.Router();

router.get('/me', (req, res) => {
  const { _id, name, email, date, shopping_cart } = req.user;

  return res.json({ _id, name, email, date, shopping_cart});
});

router.post('/cart',async(req,res)=>{
  const {  _id, name, email, date } = req.user;
  const itemId = req.body.item;
  const userId = _id;
  console.log({
    userId,
    itemId
  }) ;

  try {
    let cart = await Cart.findOne({userId:userId});
    console.log(cart)
    if (cart) {
        cart.products.push(itemId);
      cart = await cart.save();
      cart = await Cart.findOne({userId:userId}).populate("products");
      return res.status(201).send(cart.products);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId:userId,
        products: [itemId]
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});
router.get('/cart',async(req,res)=>{
  const {  _id, name, email, date } = req.user;
  const itemId = req.body.item;
  const userId = _id;
  console.log({
    userId,
    itemId
  }) ;
  try {
    let cart = await Cart.findOne({userId:userId}).populate("products"); 
    if (!cart) {
      return 'Empty Shopping Cart'
    }
    return res.json(cart.products);
  }
    catch (err){
      console.log(err);
      res.status(500).send("Something went wrong");
    }
});

router.delete('/cart/:id',async(req,res)=>{
  const {  _id, name, email, date } = req.user;
  const itemId = req.params.id;
  const userId = _id;
  console.log({
    userId,
    itemId
  }) ;
  try {
    let cart = await Cart.findOne({userId:userId});
    // let itemIndex = cart.products.findIndex(p => p == itemId);
    // let newProductList = cart.products.splice(itemIndex,1)
   cart.products = cart.products.filter(product => product != itemId );
   
   cart = await cart.save();
   cart = await Cart.findOne({userId:userId}).populate("products");
    return res.json(cart.products);
  }
    catch (err){
      console.log(err);
      res.status(500).send("Something went wrong");
    }
})



module.exports = router;
