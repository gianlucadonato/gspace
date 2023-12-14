"use client";

import { useSession, signOut } from "next-auth/react";
import SessionData from "@/components/session-data";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  return (
    <div>
      <h1>Hello, Dashboard Page!</h1>
      <Button
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <SessionData session={session} />
      )}
    </div>
  );
}
