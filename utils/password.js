const bcrypt = require('bcrypt');
const saltRounds = 10;


const HashPassword=async(myPlaintextPassword)=>{
    return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        if (err) reject(err);
          else {
            resolve(hash);
          }
    });
})
}

const ComparePassword=(myPlaintextPassword,hash)=>{
    return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        // result == true
        if (err) reject(err);
        else {
            resolve(result);
          }
    })});
}

module.exports={
    HashPassword,
    ComparePassword
}