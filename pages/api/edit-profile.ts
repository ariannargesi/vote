import { NextApiRequest, NextApiResponse } from "next";
import sizeOf from 'image-size'
import multer from 'multer'
import path from 'path';
import fs from 'fs'
import { getServerSession } from "next-auth";
import authOption from "./auth/[...nextauth]";
import { users } from "@/server-logic/db/setup";
import { z } from "zod";
import { locations } from "@/shared";
import checkUsername from "@/server-logic/utils";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
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
}).single('avatar');

const zod_updateProfile = z.object({
  username: z.string().min(3).max(32).optional(),
  bio: z.string().max(2048).optional(),
  location: z.string().refine((value: string) => locations.includes(value)).optional(),
  avatar: z.any().optional()
}).strict()

function checkDimentions(path: string) {
  try {
    const { width, height } = sizeOf(path)
    return width === height
  }catch(error){
    return false 
  }
  
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOption)
  // @ts-ignore
  const email = session!.user.email
  // @ts-ignore
  const { avatar, location, _id } = await users.findOne({ email })

  upload(req as any, res as any, async (err) => {
    // if this is fasle, do not allow update
    let allowUpdate = true 
    if (err)
      res.status(500).json({ type: 'error', message: 'مشکلی پیش آمده' })
    else {
      // @ts-ignore
      const file = req.file
      const properties: any = {}
      if (file) {
        const filePath = file.destination + file.filename
        const isOkay = checkDimentions(filePath)
        if (isOkay)
        // @ts-ignore
          properties.avatar = req.file.path
        else {
          fs.unlinkSync(filePath)
          allowUpdate = false 
        }
      }

      // check request schema using zod 
      const body = req.body
      zod_updateProfile.parse(body) 
      // if user has sent a username field in the request
      if (body.username) {
        const isValidUsername = await checkUsername(body.username)
        if (isValidUsername)
          properties.username = body.username
        else {
          res.status(422).json({ type: 'error', message: 'نام کاربری در دسترس نیست' })
          allowUpdate = false 
        }
      }
      if (body.location && body.location != location)
        if (!location)
          properties.location = body.location
        else {
          res.status(405).json({ type: 'error', message: 'اجازه تغییر شهر وجود ندارد' })
          allowUpdate = false 
        }
      if (body.bio)
        properties.bio = body.bio
        // remove avatar 
      if (req.body.avatar === 'clear') {
        properties.avatar = null
        if(fs.existsSync(avatar))
          fs.unlinkSync(avatar)
      }
      // perform query to database 
      if(allowUpdate === false)
        return res.status(400)
  
      const queryResult = await users.updateOne({ _id }, { $set: properties })
      if (queryResult.acknowledged)
        if (queryResult.modifiedCount === 1)
          res.status(200).json({ type: 'success', message: 'پروفایل کاربر با موفقیت ویرایش شد.' })
        else return res.status(404).json({ type: 'error', message: 'کاربر یافت نشد!' })
      else return res.status(500).json({ type: 'error', message: 'مشکلی پیش آمده!' })
    }
  })
  }
  catch(error){
    return res.status(500).json({type: 'error', message: 'مشکلی پیش آمده!'})
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};