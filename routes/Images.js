const { UploadPublicFile } = require('../services/Upload');
const { Auth } = require('../utils/jwtToken');
const fs = require('fs');
const FileType = require('file-type');
const multiparty = require('multiparty');
const Query = require('../db').query;
const imageModel = require('../models/Images');
const Upload = async (app) => {
  app.post('/api/upload/image/:userid', Auth, (req, res, next) => {
    const form = new multiparty.Form();
    let UserId = req.userid;
    form.parse(req, async (error, fields, files) => {
      console.log('files: ', files);
      if (error) {
        return res.status(500).send(error);
      }

      try {
        const path = files.file[0].path;
        const defaultName = files.file[0].originalFilename;
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);
        const ImageType = type.ext;
        const fileName = `${UserId}/${defaultName}/${Date.now().toString()}`;
        const data = await UploadPublicFile(buffer, fileName, type);
        let temp = {};
        temp.name = defaultName;
        temp.imageurl = data.Location;
        temp.type = ImageType;
        temp.userid = UserId;

        const values = imageModel
          .insert(temp)
          .returning(imageModel.imageurl)
          .toQuery();
        Query(values)
          .then((respone) => {
            res.status(200).json({
              imageurl: respone[0].imageurl,
              userid: UserId,
              message: 'Upload Image Successfully'
            });
          })
          .catch((err) => {
            return res.status(500).json({
              message: 'Upload Image fail'
            });
          });
      } catch (err) {
        return res.status(500).send(err);
      }
    });
  });

  app.get('/api/images/:userid', (req, res) => {
    let QueryText = 'SELECT imageurl,name,type FROM images WHERE userid=$1';
    Query(QueryText, [req.params.userid])
      .then((respone) => {
        console.log('respone: ', respone);
        res.status(200).json(respone);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};
exports.Upload = Upload;
