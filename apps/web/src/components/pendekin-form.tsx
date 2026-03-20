"use client"

import { useState } from "react"
import { Button } from "@az/ui"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@az/ui"
import { Link2, Globe, Zap } from "lucide-react"
import { useShortenUrl } from "@/hooks/use-pendekin"
import { useRouter } from "next/navigation"
import { ShortenUrlRequest } from "@/lib/api-client"

interface PendekinFormProps {
    onSuccess?: (shortUrl: string) => void
    onError?: (error: Error) => void
    showTitle?: boolean
    className?: string
}

export function PendekinForm({ 
    onSuccess, 
    onError, 
    showTitle = true, 
    className = "" 
}: PendekinFormProps) {
    const [originalUrl, setOriginalUrl] = useState("")
    const [customAlias, setCustomAlias] = useState("")
    
    const shortenUrlMutation = useShortenUrl()
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        if (!originalUrl.trim()) {
            return
        }

        const request: ShortenUrlRequest = {
            original_url: originalUrl.trim(),
            ...(customAlias.trim() && { short_path: customAlias.trim() })
        }

        shortenUrlMutation.mutate(request, {
            onSuccess: (data) => {
                // Always redirect on success (200 response)
                const shortPath = data.data?.short_path || data.result?.short_path || data.short_path
                if (shortPath) {
                    onSuccess?.(`az.id/${shortPath}`)
                }
                // Redirect regardless of response structure
                router.push('/routes')
            },
            onError: (error) => {
                onError?.(error)
            }
        })
    }

    const resetForm = () => {
        setOriginalUrl("")
        setCustomAlias("")
        shortenUrlMutation.reset()
    }

    return (
        <Card className={className}>
            {showTitle && (
                <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                        <Link2 className="size-5" />
                        <span>URL Shortener</span>
                    </CardTitle>
                    <CardDescription>
                        Enter a long URL and optionally specify a custom alias for your shortened link.
                    </CardDescription>
                </CardHeader>
            )}
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* URL Input */}
                    <div className="space-y-2">
                        <label htmlFor="originalUrl" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                            Original URL
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                            <input
                                id="originalUrl"
                                type="url"
                                placeholder="https://example.com/very-long-url-that-needs-shortening"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                                disabled={shortenUrlMutation.isPending}
                            />
                        </div>
                    </div>

                    {/* Custom Alias Input */}
                    <div className="space-y-2">
                        <label htmlFor="customAlias" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                            Custom Alias (Optional)
                        </label>
                        <div className="relative">
                            <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                            <input
                                id="customAlias"
                                type="text"
                                placeholder="my-custom-link (optional)"
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                pattern="[a-zA-Z0-9-_]{3,20}"
                                title="Only letters, numbers, hyphens and underscores (3-20 characters)"
                                disabled={shortenUrlMutation.isPending}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        disabled={shortenUrlMutation.isPending || !originalUrl.trim()}
                        className="w-full"
                    >
                        {shortenUrlMutation.isPending ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent border-r-transparent border-b-transparent mr-2" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Zap className="mr-2 size-4" />
                                Shorten URL
                            </>
                        )}
                    </Button>
                </form>

                {/* Result Display */}
                {(shortenUrlMutation.data || shortenUrlMutation.error) && (
                    <div className={`mt-6 p-4 rounded-md border ${
                        shortenUrlMutation.data?.success 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-red-50 border-red-200'
                    }`}>
                        <div className="flex items-center gap-3">
                            {shortenUrlMutation.data?.success ? (
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-green-800">✅ Success!</h4>
                                    <p className="text-sm text-green-700">
                                        {shortenUrlMutation.data.message || "URL shortened successfully!"}
                                    </p>
                                    {shortenUrlMutation.data.data?.short_path && (
                                        <div className="mt-2">
                                            <p className="text-xs text-green-600 font-medium">Your shortened URL:</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">
                                                    az.id/{shortenUrlMutation.data.data.short_path}
                                                </code>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`az.id/${shortenUrlMutation.data?.data?.short_path}`)
                                                    }}
                                                >
                                                    <Link2 className="size-3" />
                                                    Copy
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-red-800">❌ Error</h4>
                                    <p className="text-sm text-red-700">
                                        {shortenUrlMutation.error?.message || "Failed to shorten URL"}
                                    </p>
                                </div>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={resetForm}
                            >
                                ×
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
