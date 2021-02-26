import axios from 'axios';

const userController = {
  getUser: function() {
    return axios.get(`/api/users/me`);
  },
  get_cart:()=>{
    return axios.get('/api/users/cart');
}
};

export default userController;
