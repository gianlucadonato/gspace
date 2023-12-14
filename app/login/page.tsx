"use client";

import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import gspaceLogo from "../../public/gspace-logo.svg";
import Link from "next/link";

export default function LoginPage() {
  const rand = Math.round(Math.random() * 2);
  return (
    <div className="w-screen h-screen flex items-center justify-center">

      <div className="relative hidden md:flex flex-col max-w-[683px] h-full p-10 text-white">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src={`/bg-paragliding${rand}.JPG`}
            className="object-cover w-full h-full overflow-hidden"
            width="683"
            height="1000"
            alt="gspace logo"
          />
        </div>

        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/" className="block w-[150px]">
            <Image src={gspaceLogo} alt="gspace logo" />
          </Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;You are a human with one life and it&apos;s up to you to
              make it the best life you can&rdquo;
            </p>
            <footer className="text-sm">Dan Howell</footer>
          </blockquote>
        </div>
      </div>

      <div className="absolute top-0 w-full flex justify-center md:hidden p-10">
        <Link href="/" className="block w-[150px]">
          <Image src={gspaceLogo} alt="gspace logo" />
        </Link>
      </div>
      <div className="grow flex justify-center p-6">
        <div className="flex w-full flex-col space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and pwd below to sign in
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
