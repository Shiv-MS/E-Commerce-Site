const axios = require('axios');

module.exports = {
    get_product: ()=>{
        return axios('/api/product')
    }
}
