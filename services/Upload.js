const fs=require('fs');
const AWS=require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const s3 = new AWS.S3();
const UploadFile=(buffer, name, type)=>{

    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: process.env.ASW_BUCKET_NAME,
        ContentType: type.mime,
        Key: `${name}.${type.ext}`,
      };
    return s3.upload(params).promise();
}
module.exports={
    UploadFile
}