"use client"

import { Button } from "@az/ui"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@az/ui"
import { PendekinForm } from "@/components/pendekin-form"
import { useRouter } from "next/navigation"

interface CreateRouteModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CreateRouteModal({ open, onOpenChange }: CreateRouteModalProps) {
    const router = useRouter()

    const handleSuccess = (shortUrl: string) => {
        console.log('URL shortened successfully:', shortUrl)
        // Close modal and redirect to routes page
        onOpenChange(false)
        router.push('/routes')
    }

    const handleError = (error: Error) => {
        console.error('Failed to shorten URL:', error)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Route</DialogTitle>
                    <DialogDescription>
                        Transform long URLs into short, memorable routes with custom aliases.
                    </DialogDescription>
                </DialogHeader>
                <PendekinForm 
                    onSuccess={handleSuccess}
                    onError={handleError}
                    showTitle={false}
                    className="border-0 shadow-none p-0"
                />
            </DialogContent>
        </Dialog>
    )
}
