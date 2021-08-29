const nodemailer =require('nodemailer');
const { string } = require('pg-format');




  let mailOptionsDefault = {
    from:'noReply_NovelX@gmail.com',
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
      console.log('hellooo')
      transporter.sendMail(Object.assign(mailOptionsDefault,mailOptions), function(err, data) {
        
          if (err) {
            console.log("Error " + err);
          } else {
            
            console.log("Email sent successfully");
            if(callback){
              callback()
            }
          }
        });
  }

module.exports={
    SendEmail
}