import { NextApiRequest, NextApiResponse } from "next";
import sizeOf from 'image-size'
import multer from 'multer'
import path from 'path';
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage, 
  limits: {
    fieldNameSize: 300,
    fileSize: 1000000
  },
  fileFilter: (req, file, callback) => {
    const acceptableExtensions = ['.png', '.jpg', '.jpeg'];
    if (!(acceptableExtensions.includes(path.extname(file.originalname)))) {
      return callback(new Error('file type is not acceptable'));
    }
    callback(null, true);
  }
}).single('file');


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
     new Promise<void>((resolve, reject) => {
      upload(req as any, res as any, (err) => {
        if (err) {
          reject(err);
        } else {    
          /**
           * ABOUT @ts-ignore
           * request object witht type of NextApiRequest it is not 
           * supported by multer, so in order to keep code short, I added ts-ignore 
           */
          // @ts-ignore
          const file = req.file 
          const path = file.destination  + file.filename 
          const {width, height} = sizeOf(path)
          if(width != height){
            try {
              fs.unlinkSync(path)
            }catch(err){
              console.log(err)
            }
            reject('طول و عرض عکس برابر نیست')
          }
          else {
            // @ts-ignore
            resolve(req.file);
          }
        }
      })
    }).then(file => {
      // @ts-ignore
        if(!file)
        res.status(400).send('No file was uploaded');
        else 
        res.status(200).send('File uploaded successfully');
    }).catch(error => {
      res.status(200).send(error)
    })
    
  } else {
    res.status(405).send('Method not allowed');
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};