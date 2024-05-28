import { auth } from "@/auth"

export default auth((req)=>{
    const isLoggedIn = !!req.auth
    console.log("Route :", req.nextUrl.pathname)
    console.log("Is Logged In :", isLoggedIn)
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  };