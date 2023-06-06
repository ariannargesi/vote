import { NextMiddleware, NextResponse } from "next/server";

const publicPages = ['/', '/login', '/signup', '/api/auth/signin', '/edit-profile']

export const middleware: NextMiddleware = async (req) => {
    const sessionToken = req.cookies.get('next-auth.session-token')

    if (req.nextUrl.pathname.startsWith("/_next")) 
        return NextResponse.next();

    if(req.nextUrl.pathname.startsWith('/api/auth')){
        return NextResponse.next()
    }

    const isProtectedPgae = publicPages.includes(req.nextUrl.pathname) === false
    const isProtectedApi = req.nextUrl.pathname.startsWith('/api/p')

    if((isProtectedApi || isProtectedPgae) && !sessionToken){
        const url = req.nextUrl.clone()
        url.pathname = '/api/auth/signin'
        return NextResponse.redirect(url)
    }
}

