"use client"
import {useRouter} from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode,
  mode?: "modal" | "redirect",
  aschild?:boolean;
}
export const LoginButton=(
    {
    children,
    mode = "redirect",
    aschild = false
    }: LoginButtonProps
) => {
    const router = useRouter();


    const onClick = () => {
       router.push("/auth/login");
    };

    if(mode=="modal")
        {
        return (
            <span>todo</span>
        )
        }

  return (
    <span className="cursor-pointer" onClick={onClick}>{children}</span>
  )
}

