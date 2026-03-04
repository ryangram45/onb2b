import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserRole } from "./lib/constants/roles";

export default withAuth( function middleware(request) {
    const role = request.nextauth.token?.role;

    if (request.nextUrl.pathname.startsWith("/admin")) {
        if(role !== UserRole.ADMIN) {
            return NextResponse.redirect(new URL("/home/account", request.url));
        }
}
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/home/:path*"]
}