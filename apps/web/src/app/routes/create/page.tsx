"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateRouteRedirectPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to routes page with create parameter
        router.replace('/routes?create=true')
    }, [router])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent border-r-transparent border-b-transparent mx-auto mb-4" />
                <p className="text-muted-foreground">Redirecting...</p>
            </div>
        </div>
    )
}
