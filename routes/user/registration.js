var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  var { email, name, password } = req.body;
  User.findOne({name:name})
  .then(userFind =>{
    if(userFind){
      res.send({errMsg: "This login already userd", errType: 'login'})
      throw new Error("This name already userd");
    }else {
      if(password.length < 5){
        return res.send({errMsg: `Password invalid. Min length 5, your password length - ${password.length}`, errType:'password'})
      }
      password = bcrypt.hashSync(password, 8);
      var user = new User({ email, name, password });
      return user.save().catch(err => res.send(err.code===11000?{errMsg: "This email already userd", errType: 'email'}:{errMsg:err.message}));
    }
  })
  .then(newUser =>{
    var token = jwt.sign({ name: newUser.name, role: newUser.role }, `omgSecret_${newUser.password}`);
    return res.send({token, userName: newUser.name, userRole: newUser.role});
  })
  .catch(err=>console.log(err))
});

module.exports = router;
