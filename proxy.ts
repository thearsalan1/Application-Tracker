import {NextRequest,NextResponse} from "next/server"
import { getSession } from "./lib/auth/auth";

export default async function proxy(request:NextRequest,res:NextResponse){
  const session =await getSession();

  const isDashboardPage = request.nextUrl.pathname.startsWith("/dashboard");
  if(isDashboardPage && !session?.user){
    return NextResponse.redirect(new URL("/sign-in",request.url))
  }
  const isSignIn = request.nextUrl.pathname.startsWith("/sign-in");
  const isSignUp = request.nextUrl.pathname.startsWith("/sign-up");
  
  if((isSignIn || isSignUp) && session?.user){
    return NextResponse.redirect(new URL("/",request.url))
  }
  return NextResponse.next();
}