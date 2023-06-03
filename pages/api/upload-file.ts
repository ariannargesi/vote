import formidable, { File } from "formidable";
import Jimp from "jimp";
import fs from 'fs'
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import authOption from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const session = await getServerSession(req, res, authOption)
  // if (!session)
  //   return res.status(302).end()
  const form = new formidable.IncomingForm()
  form.parse(req, (error, fields, files) => {
    const file = files.file as File
    console.log('newFilename: ', file.newFilename)
    const newFilename = file.newFilename + '.' + 'jpg';
    const newPath = `./${newFilename}`;
    const fileData = fs.readFileSync(file.filepath);
    fs.writeFileSync(newPath, fileData)
    console.log('write was successfull')
  })
  res.json({ status: 'success' })
}

export const config = {
  api: {
    bodyParser: false,
  },
};