import { polls } from "@/server-logic/db/setup";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const newPoll = z.object({
    title: z.string().min(3, 'عنوان کوتاه است').max(256, 'عنوان طولانی است'),
    caption: z.string().max(2048, 'توضیحات بلند است').optional(),
    anonymous: z.boolean().optional(),
    options: z.string().min(1, 'طول گزینه کوتاه است').max(128, 'طول گزینه بلند است').array().min(2, 'گزینه‌ها کم هستند').max(6, 'گزینه‌ها زیاد هستند'),
    location: z.string().refine(value => locations.includes(value), 'استان معتبر نیست'),
    category: z.string().refine(value => categories.includes(value), 'دسته‌بندی معتبر نیست'), 
}).strict()


export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST'){
            try {
                const data = newPoll.parse(req.body)
                const result = await polls.insertOne(data)
                if(result.acknowledged)
                    res.json({status: 'success', insertedId: result.insertedId})
                else res.status(500).end()
            }catch(error){
                res.json({status: 'error', error})
            }
    }
    else if(req.method === 'GET'){
        // return poll information
    }
    else if(req.method === 'DELETE'){
        // delete poll 
    }
}



export const locations = ["آذربایجان شرقی","آذربایجان غربی","اردبیل","اصفهان","البرز","ایلام","بوشهر","تهران","چهارمحال و بختیاری","خراسان جنوبی","خراسان رضوی","خراسان شمالی","خوزستان","زنجان","سمنان","سیستان و بلوچستان","فارس","قزوین","قم","کردستان","کرمان","کرمانشاه","کهگیلویه و بویراحمد","گلستان","گیلان","لرستان","مازندران","مرکزی","هرمزگان","همدان","یزد"]
export const categories = ['کسب‌و‌کار', 'اقتصاد']
