const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/me', (req, res) => {
  const { _id, name, email, date } = req.user;

  return res.json({ _id, name, email, date });
});

router.get('/data', (req, res) => {
  //verify the JWT token generated for the user
  jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
      if(err){
          //If error send Forbidden (403)
          console.log('ERROR: Could not connect to the protected route');
          res.sendStatus(403);
      } else {
          //If token is successfully verified, we can send the autorized data 
          res.json({
              message: 'Successful log in',
              authorizedData
          });
          console.log('SUCCESS: Connected to protected route');
      }
  })
});




router.get('/me/cart',(req,res) =>{
  jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
    if(err){
        //If error send Forbidden (403)
        console.log('ERROR: Could not connect to the protected route');
        res.sendStatus(403);
    } else {
        //If token is successfully verified, we can send the autorized data 
        res.json({
            message: 'Successful log in',
            authorizedData,
        });
        console.log('SUCCESS: Connected to protected route')
    }
  // const {shopping_cart} = req.user;

  // return res.json({shopping_cart});
})})
// app.get('/user/data', checkToken, (req, res) => {
//   //verify the JWT token generated for the user
//   jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
//       if(err){
//           //If error send Forbidden (403)
//           console.log('ERROR: Could not connect to the protected route');
//           res.sendStatus(403);
//       } else {
//           //If token is successfully verified, we can send the autorized data 
//           res.json({
//               message: 'Successful log in',
//               authorizedData
//           });
//           console.log('SUCCESS: Connected to protected route');
//       }
//   })
module.exports = router;
