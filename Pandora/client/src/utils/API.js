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
    delete_cart:(id)=>{
        return axios.get(`/api/users/cart/${id}`)
    }
}
