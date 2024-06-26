import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "../components/auth/login-button";


const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})
export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[#1b1b1b]">
       <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md ", font.className)}>
        👋Auth
        </h1>
        <p className="text-white text-lg">
          A simple Authentication service
        </p>
        <div>
          <LoginButton>
          <Button variant={"secondary"} size={"lg"}>Sign In</Button>
          </LoginButton>
       
        </div>
      
       </div>
     </main>
  );
}
