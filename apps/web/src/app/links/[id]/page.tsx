"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@az/ui"
import { ArrowLeft, Copy, ExternalLink, BarChart3, Trash2, Edit } from "lucide-react"

export default function LinkDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Mock data - replace with actual data fetching
  const linkData = {
    id: id,
    originalUrl: "https://example.com/very-long-url-that-needs-to-be-shortened",
    shortUrl: "https://short.ly/abc123",
    title: "Example Link",
    description: "This is a sample link description",
    clicks: 1250,
    createdAt: "2024-01-15 10:30:00",
    updatedAt: "2024-03-10 14:45:00",
    expiresAt: "2024-12-31 23:59:59",
    status: "active",
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkData.shortUrl)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleCopyOriginal = async () => {
    try {
      await navigator.clipboard.writeText(linkData.originalUrl)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy original URL:', err)
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this link?')) {
      // Add delete logic here
      router.push('/links')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{linkData.title || 'Link Details'}</h1>
            <p className="text-muted-foreground">Manage your short link</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Link Information */}
        <div className="space-y-4">
          <div className="rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Link Information</h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Short URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 p-2 bg-muted rounded-md font-mono text-sm break-all">
                    {linkData.shortUrl}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={linkData.shortUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Original URL</label>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 p-2 bg-muted rounded-md font-mono text-sm break-all">
                    {linkData.originalUrl}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleCopyOriginal}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={linkData.originalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Title</label>
                <div className="mt-1 p-2 bg-muted rounded-md">
                  {linkData.title}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <div className="mt-1 p-2 bg-muted rounded-md">
                  {linkData.description}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.createdAt}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.updatedAt}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Expires</label>
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.expiresAt}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="mt-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {linkData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics & QR Code */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="rounded-lg border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Quick Stats</h2>
              <Button variant="outline" size="sm" asChild>
                <a href={`/analytics/${id}`}>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </a>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{linkData.clicks.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total Clicks</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">--</div>
                <div className="text-sm text-muted-foreground">Today</div>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">QR Code</h2>
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg">
                <img 
                  src={linkData.qrCode} 
                  alt="QR Code" 
                  className="w-32 h-32"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                Download QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
