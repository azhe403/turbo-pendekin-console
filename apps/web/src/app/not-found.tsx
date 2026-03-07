"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@az/ui"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. The page might have been removed, renamed, or is temporarily unavailable.
        </p>
      </div>
      
      <div className="space-y-4">
        <Button asChild size="lg">
          <Link href="/">
            Go back home
          </Link>
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Or{" "}
          <Link href="/links" className="underline hover:text-foreground transition-colors">
            view your links
          </Link>{" "}
          or{" "}
          <Link href="/analytics" className="underline hover:text-foreground transition-colors">
            check analytics
          </Link>
        </div>
      </div>
    </div>
  )
}
