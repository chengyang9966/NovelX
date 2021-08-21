const {UploadFile}=require('../services/Upload')
const {Auth}=require('../utils/jwtToken');
const fs = require('fs');
const FileType = require('file-type');
const multiparty = require('multiparty');
const Upload=async (app)=>{
    app.post('/api/upload/image/:userid',Auth,((req,res,next)=>{
      
        const form = new multiparty.Form();
        let UserId=req.userid
        form.parse(req, async (error, fields, files) => {
      if (error) {
          return res.status(500).send(error);
  
      };
      
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await FileType.fromBuffer(buffer);
      const fileName = `${UserId}/${Date.now().toString()}`;
      const data = await UploadFile(buffer, fileName, type);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
       

    }))
}
exports.Upload=Upload;