import NextAuth from "next-auth"
import authConfig from "./auth.config"

const {auth}= NextAuth(authConfig)
import {
    DEFAULT_LOGIN_REDIRECT,
    apiauthPrefix,
    authRoute,
    publicRoute
} from "@/routes"
import next from "next"

export default auth((req)=>{
    const {nextUrl}=req;
    const isLoggedIn=!!req.auth;

    const isApiAuthRoute=nextUrl.pathname.startsWith(apiauthPrefix);
    const isPublicRoute=publicRoute.includes(nextUrl.pathname);
    const isAuthRoute=authRoute.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return ;
    }

    if(isAuthRoute){
        if(isLoggedIn)
        {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return ;
    }
    if(!isLoggedIn && !isPublicRoute){
        return Response.redirect(new URL("/auth/login", nextUrl))
    }
    return;
    
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };