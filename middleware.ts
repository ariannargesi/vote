import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import authOption from "./pages/api/auth/[...nextauth]";

export async function middleware (request: NextRequest) {
}

export const config = {
    matcher: ['/api/protected/:path*'],
}
  