import Image from "next/image";
import {Button} from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-500">
       <div className="space-y-6">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
        👋Auth
        </h1>
        <p>
          A simple Authentication service
        </p>
       </div>
     </main>
  );
}
