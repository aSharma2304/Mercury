'use client'
import { ThemeToggle } from "@/components/custom/ThemeToggle";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import SquareButton from "@/components/custom/SquareButton";
import { SigninSvg } from "@/components/custom/SigninSvg";
import { Button } from "../ui/button";

const SideOptions = () => {
  return (
    <div className="flex justify-center items-center p-4 gap-4 h-fit fixed bottom-4 right-4 rounded-md bg-card shadow-md">
        <SignedOut>
        <SignInButton>
            <div>
            <Button variant={"secondary"}> Sign in</Button>
            </div>
        </SignInButton>
        <SignUpButton>
            <div>
            <Button > Sign up</Button>
            </div>
        </SignUpButton>
        </SignedOut>
        <SignedIn>
        <UserButton />
        </SignedIn>
        <ThemeToggle/>
    </div>
  )
}

export default SideOptions