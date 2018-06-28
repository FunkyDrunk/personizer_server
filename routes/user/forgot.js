var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var User = require('../../schemes/userSchema');
var sendMail = require('./sendMail');
mongoose.Promise = Promise;



/* GET home page. */
router.post('/', function(req, res, next) {
  var { email } = req.body;
  User.findOne({email:email})
  .then(userFind =>{
    if(!userFind){
      res.send({errMsg:"Email not found", errType:"email"});
      throw new Error("Email not found");
    }else {
      sendMail(email, userFind.name, function(err, data){  // FIXME: Переписать в промисы
        if(err){
          return res.send({errMsg: err.message})
        }
        let newPassword = bcrypt.hashSync(data.password, 8);
        User.findOneAndUpdate(userFind._id, { password: newPassword } )
        .then(() => res.send({success: data.message}))
        .catch(err => res.send(err))
      })

    }
  })
  .catch(err => console.log(err))
});

module.exports = router;
