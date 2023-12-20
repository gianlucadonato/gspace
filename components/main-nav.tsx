import Link from "next/link"
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const currentRoute = usePathname();
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${currentRoute !== '/dashboard' && 'text-muted-foreground'}`}
      >
        Overview
      </Link>
      <Link
        href="/following"
        className={`text-sm font-medium transition-colors hover:text-primary ${currentRoute !== '/following' && 'text-muted-foreground'}`}
      >
        Following
      </Link>
    </nav>
  )
}