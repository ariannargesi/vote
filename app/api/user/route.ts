import { getUser } from "@/app/helpers/user";
import { users } from "@/server-logic/db/setup";
import checkUsername from "@/server-logic/utils";
import { locations } from "@/shared";
import z from 'zod'
import { badRequest, forbidden, internalError, notFound, updated } from "../helpers";

const zod_updateProfile = z.object({
    username: z.string().min(3).max(32).optional(),
    bio: z.string().max(2048).optional(),
    location: z.string().refine((value: string) => locations.includes(value)).optional(),
}).strict()

export async function PATCH(request: Request) {
    const body = await request.json()
    try { zod_updateProfile.parse(body) }
    catch (error) {
        return badRequest(error)
    }
    const user = await getUser()
    const isValidUsername = await checkUsername(body.username)
    if(user.location && body.location != user.location)
        return forbidden('اجازه تغییر شهر وجود ندارد')
    else if(body.username !== user.username && isValidUsername === false)
        return forbidden('نام کاربری معتبر نبیست')
    const queryResult = await users.updateOne({ _id: user._id}, {$set: {...body}})
    if (queryResult.acknowledged)
        if (queryResult.modifiedCount === 1)
            return updated('پروفایل با موفقیت ویرایش شد!')
        else return notFound('کاربر یافت نشد!')
    else return internalError()
}

