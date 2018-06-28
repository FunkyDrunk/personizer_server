var nodemailer = require('nodemailer');

function sendMail(email, login, callback){
  let password = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  let transporter = nodemailer.createTransport({   // FIXME: Обработать ошибку как?!
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: `personizertest@gmail.com`,
          pass: `personizer123`
      }
  });
  let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>',
      to: email,
      subject: 'Ха работает епть',
      text: 'test',
      html: `<b>Your Login: ${login}
      Password: ${password}
      <div>
      <img src='https://cs8.pikabu.ru/post_img/big/2016/03/22/5/1458627087166722591.jpg' width=200 heigth=200>
      <div>
      </b>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          var err={message: 'Sending failed'}
          callback(err)
      }
      else {
        var data = {message:'Password send to email', password:`${password}`}
        callback(null, data)
      }
  });
}

module.exports = sendMail;
