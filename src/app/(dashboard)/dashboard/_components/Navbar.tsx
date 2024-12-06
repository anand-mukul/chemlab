import Link from "next/link"
import { Home, BookOpen, Box, FolderOpen, GraduationCap, Trophy, HelpCircle, Menu } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const items: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Classes",
    href: "/classes",
    icon: BookOpen,
  },
  {
    title: "Designs",
    href: "/designs",
    icon: Box,
  },
  {
    title: "Collections",
    href: "/collections",
    icon: FolderOpen,
  },
  {
    title: "Tutorials",
    href: "/tutorials",
    icon: GraduationCap,
  },
  {
    title: "Challenges",
    href: "/challenges",
    icon: Trophy,
  },
]

export function Navbar() {
  return (
    <>
      <div className="hidden md:flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors",
              item.href === "/" && "bg-accent text-accent-foreground"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}
        <Link
          href="/help"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors mt-auto"
        >
          <HelpCircle className="w-5 h-5" />
          Help Center
        </Link>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors",
                  item.href === "/" && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            ))}
            <Link
              href="/help"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors mt-auto"
            >
              <HelpCircle className="w-5 h-5" />
              Help Center
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

