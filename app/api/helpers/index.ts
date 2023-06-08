import { NextResponse } from "next/server"

type ResponseObject = {
    type: string,
    message: string,
    status: number 
}

/**
 * operation not permitted 
 * @returns NextResponse 
 */

export function forbidden(message: string): NextResponse<ResponseObject> {
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
export function updated(message: string): NextResponse<ResponseObject> {
return NextResponse.json({
        type: 'success',
        message: message,
        status: 204
    })
}
/**
 * bad request
 * @param message response message 
 * @returns NextResponse
 */
export function badRequest(message: string): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'error',
        message: message,
        status: 400
    })
}

/**
 * internal server error 
 * @returns NextResponse 
 */
export function internalError(): NextResponse<ResponseObject> {
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
export function notFound(message: string): NextResponse<ResponseObject> {
    return NextResponse.json({
        type: 'error',
        message: message,
        status: 404
    })
}
