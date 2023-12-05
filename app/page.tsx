"use client";

import Image from "next/image";
import gspaceLogo from "../public/gspace.svg";
import gspaceLogo2 from "../public/gspace-logo.svg";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-stone-950">
      <div className="bg-radial h-full w-full"></div>
      <div className="fixed top-0 flex h-screen w-screen items-center justify-center">
        <Image width="400" src={gspaceLogo} alt="gspace logo" />
      </div>
      
      <div className="fixed top-0 flex w-screen justify-end p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Login</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className="w-[250px] mx-auto">
                <Image width="400" src={gspaceLogo2} alt="gspace logo" />
              </div>
            </DialogHeader>
            <div className="p-4 pb-2">
              <LoginForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
