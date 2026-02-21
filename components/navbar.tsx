"use client"

import { Briefcase, Ghost } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession, getSignOut } from "@/lib/auth/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutButton from "./sign-out-button";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar(){
  const {data:session} = useSession()
  return(
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        {session?.user ? (
          <>
            <Link href="/dashboard" >
              <Button variant="ghost" className="text-gray-700 hover:text-black">
                Dashboard
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Avatar>
                    <AvatarFallback className="bg-primary">
                      {session.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel className="flex flex-col gap-1">
                  <span className="font-medium">{session.user.name}</span>
                  <span className="text-sm text-muted-foreground">{session.user.email}</span>
                </DropdownMenuLabel>
                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) :(<>
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
        <Briefcase/>
        Job Tracker
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" >
          <Button variant="ghost" className="text-gray-700 hover:text-black">Log in</Button>
          </Link>
          <Link href="/sign-up">
          <Button className="bg-primary hover:bg-primary/90">Start for Free</Button>
          </Link>
          
        </div>
        </>)}
      </div>
    </nav>
  )
}