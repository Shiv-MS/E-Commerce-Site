const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
    product_name:{
        type:String,
        required:true,
    },
    product_price:{
        type:Number,
        required:true,
    },
    product_description:{
        type:String,
    }

});
module.exports = Product = mongoose.model('Product',ProductSchema);