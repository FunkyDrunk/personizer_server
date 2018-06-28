var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  const { oldPassword, newPassword, token } = req.body;
  jwt.verify(token, 'omgSecret', function(err, decoded) {
    User.findOne({login:decoded.login})
    .then(user =>{
      if(!user){
        res.send({errMsg: "User not found", errType: 'login'})
        throw new Error("User not found");
      }
      if(bcrypt.compareSync(oldPassword, user.password)){
        return user;
      }
      else {
          res.send({errMsg: "Password invalid", errType: 'password'})
          throw new Error("Password invalid");
      }
    })
    .then(user => {
      password = bcrypt.hashSync(newPassword, 8);
     user.update({password}, function (err, raw) {
       if (err) return handleError(err);
       return res.send({msg:"Password change"});
     });
   })
    .catch(err=>console.log(err))
  })
});

module.exports = router;
