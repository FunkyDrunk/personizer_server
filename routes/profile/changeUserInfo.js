var express = require('express');
var router = express.Router();
var User = require('../../schemes/userSchema.js');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  const { firstName, lastName, job, token } = req.body;
  jwt.verify(token, 'omgSecret', function(err, decoded) {
    User.findOne({login:decoded.login})
    .then(user =>{
      if(!user){
        res.send({errMsg: "User not found", errType: 'login'})
        throw new Error("User not found");
      }
      return user
    })
    .then(user => {
     user.update({firstName, lastName, job}, function (err, raw) {
       if (err) return handleError(err);
       var token = jwt.sign({ login: user.login, role: user.role }, `omgSecret`);
       return res.send({token, userLogin: user.login, userRole: user.role, firstName, lastName, job, msg:"Info change"});
     });
   })
    .catch(err=>console.log(err))
  })
});

module.exports = router;
