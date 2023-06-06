import { getUser } from "@/app/helpers/user";
import { users } from "@/server-logic/db/setup";
import checkUsername from "@/server-logic/utils";
import { locations } from "@/shared";
import { NextResponse } from "next/server";
import z from 'zod'


type ResponseObject = {
    type: string,
    message: string,
    status: number 
}

/**
 * operation not permitted 
 * @returns NextResponse 
 */
function forbidden(message: string): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'error',
        message: message,
        status: 403
    })
}

/**
 * resource updated successfully 
 * @param message response message 
 * @returns NextResponse 
 */
function updated(message: string): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'success',
        message: message,
        status: 204
    })
}
/**
 * bad request
 * @param error error object
 * @returns NextResponse
 */
function badRequest(error: any): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'error',
        message: error,
        status: 400
    })
}

/**
 * internal server error 
 * @returns NextResponse 
 */
function internalError(): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'error',
        message: 'مشکلی پیش آمده!',
        status: 500
    })
}

/**
 *  not found 404 
 * @param message response message 
 * @returns NextResponse 
 */
function notFound(message: string): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'error',
        message: message,
        status: 404
    })
}

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

