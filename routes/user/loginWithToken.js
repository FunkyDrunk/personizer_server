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
      res.send({ error:"This login already userd",})
      throw new Error("This name already userd");
    }else {
      password = bcrypt.hashSync(password, 8);
      var user = new User({ email, name, password });
      return user.save();
    }
  })
  .then(newUser =>{
    var token = jwt.sign({ name: newUser.name, role: newUser.role }, `omgSecret_${newUser.password}`);
    return res.send({token, userName: newUser.name, userRole: newUser.role});
  })
  .catch(err=>console.log(err))
});

module.exports = router;
