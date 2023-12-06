"use client";

import { useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  
  const isAuth = false;
  if (!isAuth) router.push('/login');
  
  return (
    <section>
      <nav>yoloo</nav>
      {children}
    </section>
  );
}
