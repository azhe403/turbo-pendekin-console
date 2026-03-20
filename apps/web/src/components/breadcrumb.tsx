"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { getBreadcrumbs } from "@/lib/routes"

export function Breadcrumb() {
  const pathname = usePathname()
  const breadcrumbs = getBreadcrumbs(pathname)

  if (breadcrumbs.length <= 1) {
    return null // Don't show breadcrumbs for single page
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.title} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {crumb.href ? (
            <Link 
              href={crumb.href} 
              className="hover:text-foreground transition-colors"
            >
              {crumb.title}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{crumb.title}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
