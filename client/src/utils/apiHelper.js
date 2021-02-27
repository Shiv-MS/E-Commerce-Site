import axios from 'axios';

const userController = {
  getUser: function() {
    return axios.get(`/api/users/me`);
  },
  get_cart:()=>{
    return axios.get('/api/users/cart');
},
delete_cart:(id)=>{
    return axios.delete(`/api/users/cart/${id}`,{id});
}
};

export default userController;
