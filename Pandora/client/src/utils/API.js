const axios = require('axios');

module.exports = {
    get_product: ()=>{
        return axios('/api/product')
    },
    add_to_cart:(item)=>{
        return axios.post('/api/users/cart',{item})
    },
    get_cart:()=>{
        return axios.get('/api/users/cart')
    },
    getByName:(name)=>{
        return axios.post('/api/product/byname',{product_name:name});
    }
}
