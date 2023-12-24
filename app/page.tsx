"use client";

import Image from "next/image";
import Link from "next/link";
import gspaceLogo from "../public/gspace.svg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-stone-950">
      <div className="bg-radial h-full w-full"></div>
      <div className="fixed top-0 flex h-screen w-screen items-center justify-center">
        <Image width="400" src={gspaceLogo} alt="gspace logo" />
      </div>
      
      <div className="fixed top-0 flex w-screen justify-end p-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </main>
  );
}
