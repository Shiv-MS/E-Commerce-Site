const router = require('express').Router();
const Product = require('../models/Merchandise')
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
router.post('/byname',({body},res)=>{
    Product.find(body).then((responseDB)=>{
res.json(responseDB)
    }).catch(({message})=>{
        console.log(message)
    })
});
router.post('/bulk',({body},res)=>{
    Product.insertMany(body).then((responseDB)=>{
console.log(responseDB);

    }).catch(({message})=>{
        console.log(message)
    })
})
module.exports = router;