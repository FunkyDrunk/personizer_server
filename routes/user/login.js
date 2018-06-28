var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  var { login, password } = req.body;
  User.findOne({login:login})
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
    const { login, role, firstName, lastName, job, avatar } = user;
    var token = jwt.sign({ login: user.login, role: user.role }, `omgSecret`);
    return res.send({token, userLogin: login, userRole: role, firstName, lastName, job, avatar,});
  })
  .catch(err=>console.log(err))
});

module.exports = router;
