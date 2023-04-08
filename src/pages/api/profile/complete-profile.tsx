import formidable, { File, Files } from 'formidable'
import PersistentFile from 'formidable/PersistentFile';
import fs from 'fs'
export const config = {
  api: {
    bodyParser: false,
  },
};

export default function (req, res) {

  // const body = Object.keys(req.body) 

  const parser = formidable()

  parser.parse(req, (err, fields, file: Files) => {
    const path = 'users-assets/profiles/'
    const dirExt = fs.existsSync(path)
    const image = file.iamge
    if (dirExt === false)
      fs.mkdirSync(path, { recursive: true })
    fs.writeFileSync(path + 'adfds.png', image.toString())
    res.status(200).send()
  })
}