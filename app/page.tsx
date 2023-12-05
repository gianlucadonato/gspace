'use client'

import Image from "next/image";
import gspaceLogo from "../public/gspace.svg";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="h-screen w-screen bg-stone-950">
      <div className="bg-radial h-full w-full"></div>
      <div className="fixed top-0 flex h-screen w-screen items-center justify-center">
        <Image width="400" src={gspaceLogo} alt="gspace logo"></Image>
      </div>
      <div className="fixed top-0 flex w-screen justify-end p-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Login</Button>            
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </main>
  );
}
