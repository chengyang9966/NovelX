const webpush=require('../config/webPushConfig');

const WebPushController=function(app){
app.post('/notifications/subscribe', (req, res) => {
    const subscription = req.body;
    const payload = JSON.stringify({
        title: 'Hello!',
        body: 'It works.',
      })
    
  
  
    webpush.sendNotification(subscription, payload).then(result => console.log(result)).catch(error => {
      console.error(error.stack);

      res.status(200).json({'success': true})
    });
  });
}
exports.Webpush=WebPushController