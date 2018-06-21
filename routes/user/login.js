var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  var { name, password } = req.body;
  User.findOne({name:name})
  .then(userFind =>{
    if(!userFind){
      res.send({errMsg: "User not found", errType: 'login'})
      throw new Error("User not found");
    }else {
      if(bcrypt.compareSync(password, userFind.password)){
        return userFind;
      }
      else {
          res.send({errMsg: "Password invalid", errType: 'password'})
          throw new Error("Password invalid");
      }
    }
  })
  .then(user =>{
    var token = jwt.sign({ name: user.name, role: user.role }, `omgSecret_${user.password}`);
    return res.send({token, userName: user.name, userRole: user.role});
  })
  .catch(err=>console.log(err))
});

module.exports = router;
