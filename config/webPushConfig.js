const webpush = require('web-push');

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
console.log('publicVapidKey: ', publicVapidKey);
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
console.log('privateVapidKey: ', privateVapidKey);

// webpush.setVapidDetails(
//   'mailto:chengyang9966@gmail.com',
//   publicVapidKey,
//   privateVapidKey
// );

module.exports=webpush
