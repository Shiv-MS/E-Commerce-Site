const router = require('express').Router();
const Product = require('../models/Merchandise')
const stripe = require('stripe')('sk_test_51IRlDCEiYCN71beseIaEypLpvQrfTWTkpQDSKR2PJcrCvyBOL9qP1TW0BPMggYOSpKBlXJh2Sc65AD5dNR46PhFB00aR0VluuD');
router.get('/',(req,res)=>{
//Working
Product.find({}).then(products => { 
    res.json(products)}).catch(({message})=>{
        console.log(message);
    });


});
//Working
router.post('/',({body},res)=>{
    Product.create(body).then((responseDB)=>{
res.json(responseDB)
    }).catch(({message})=>{
        console.log(message)
    })
});
router.post('/byname',(req,res)=>{
    
    Product.find({product_name:{$regex: req.body.name, $options: "i" }}).then((responseDB)=>{
res.json(responseDB);
res.send(responseDB)
    }).catch(({message})=>{
        console.log(message)
    })
});
router.post('/pay',async(req,res)=>{
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd"
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret
    });
})
router.post('/bulk',({body},res)=>{
    Product.insertMany(body).then((responseDB)=>{
console.log(responseDB);

    }).catch(({message})=>{
        console.log(message)
    })
})
module.exports = router;