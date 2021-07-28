const nodemailer =require('nodemailer');
const { string } = require('pg-format');




  let mailOptionsDefault = {
    from:' yang826066@gmail.com',
    to: 'chengyang9966@gmail.com',
    subject: 'Nodemailer Project',
    text: 'Hi from your nodemailer project'
  };

  function SendEmail(mailOptions,callback) {
    let transporter = nodemailer.createTransport({
        service: "SendinBlue", 
        auth: {
          user: "yang826066@gmail.com",
          pass:process.env.SMTP_PASSWORD
        }
      });

      transporter.sendMail(Object.assign(mailOptionsDefault,mailOptions), function(err, data) {
          if (err) {
            console.log("Error " + err);
          } else {
              if(callback){
                callback()
              }
            console.log("Email sent successfully");
          }
        });
  }

module.exports={
    SendEmail
}