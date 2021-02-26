const axios = require('axios');

module.exports = {
    get_product: ()=>{
        return axios('/api/product')
    },
    add_to_cart:(item)=>{
        return axios.post('/api/users/cart',{item})
    }
}
