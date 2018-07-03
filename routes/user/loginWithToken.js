var express = require('express');
var router = express.Router();
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  jwt.verify(req.body.token, 'omgSecret', function(err, decoded) {
    User.findOne({login:decoded.login})
    .then(user =>{
        const { login, role, firstName, lastName, job, avatar } = user;
      if(!user){
        res.send({errMsg: "User not found", errType: 'login'})
        throw new Error("User not found");
      } else {
      var token = jwt.sign({ id: user._id, login: user.login, role: user.role }, `omgSecret`);
      return res.send({token, userLogin: login, userRole: role, firstName, lastName, job, avatar,});
    }
    })
    .catch(err=>console.log(err))
  })
});

module.exports = router;
