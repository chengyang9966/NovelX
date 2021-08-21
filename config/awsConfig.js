const path = require('path')
require('dotenv').config({ 
  silent:process.env.NODE_ENV ==='Production'
  ,path:path.join(__dirname, '../.env') });
  console.log('process.env.AWS_ACCESS_KEY: ', process.env.AWS_ACCESS_KEY);
const fs = require('fs');
const AWS = require('aws-sdk');
const BUCKET_NAME='uploadimage6641'
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const params = {
  Bucket: BUCKET_NAME,
  // CreateBucketConfiguration: {
  //     // Set your region here
  //     LocationConstraint: "Asia Pacific (Singapore) ap-southeast-1"
  // }
};
s3.createBucket(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else console.log('Bucket Created Successfully', data.Location);
});