let mongoose = require("mongoose");
let Product = require("../models/Merchandise");

mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost/e_commerce_db", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let productSeed = [
  {
    product_name:'Miss',
    product_price:10,
    product_description:'',
  image:'https://trufit-assets.s3.amazonaws.com/003Project/images/image0.jpeg'
  },
  {
    product_name:'Tiara',
    product_price:12,
    product_description:'',
    image:'https://trufit-assets.s3.amazonaws.com/003Project/images/image1.jpeg'
  },
  {
    product_name:'Reloj Pastel',
    product_price:5,
    product_description:'',
    image:'https://trufit-assets.s3.amazonaws.com/003Project/images/image2.jpeg'
  },{
    product_name:'Emperatriz',
    product_price:10,
    product_description:'',
    image:'https://trufit-assets.s3.amazonaws.com/003Project/images/image3.jpeg'
  }
];

Product.deleteMany({})
  .then(() => Product.insertMany(productSeed))
  .then(data => {
    console.log(data.result + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
