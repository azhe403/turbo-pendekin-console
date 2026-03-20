"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { Button, Input, Label, Switch, cn } from "@az/ui"
import { ArrowLeft, Copy, ExternalLink, BarChart3, Trash2, Edit, QrCode, Download, Save, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@az/ui"
import { routes } from "@/lib/routes"

export default function RouteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Mock data - replace with actual data fetching
  const linkData = {
    id: id,
    originalUrl: "https://example.com/very-long-url-that-needs-to-be-shortened",
    shortUrl: "https://short.ly/abc123",
    title: "Example Route",
    description: "This is a sample route description",
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
    } catch (err) {
      console.error('Failed to copy original URL:', err)
    }
  }

  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    title: linkData.title,
    originalUrl: linkData.originalUrl,
    description: linkData.description,
    shortPath: "abc123", // Extracted from shortUrl
    expiresAt: linkData.expiresAt,
    status: linkData.status === "active"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, status: checked }))
  }

  const handleSave = () => {
    // Add save logic here
    setIsEditing(false)
    // You could update linkData here if it was state-based
  }

  const handleCancel = () => {
    setFormData({
      title: linkData.title,
      originalUrl: linkData.originalUrl,
      description: linkData.description,
      shortPath: "abc123",
      expiresAt: linkData.expiresAt,
      status: linkData.status === "active"
    })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this route?')) {
      // Add delete logic here
      router.push(routes.routes)
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
            <h1 className="text-2xl font-bold">{linkData.title || 'Route Details'}</h1>
            <p className="text-muted-foreground">Manage your short route</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Route Information */}
        <div className="space-y-4">
          <div className="rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Route Information</h2>

            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Short URL</Label>
                {isEditing ? (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-none p-2 bg-muted rounded-l-md border-r font-mono text-sm text-muted-foreground">
                      short.ly/
                    </div>
                    <Input
                      name="shortPath"
                      value={formData.shortPath}
                      onChange={handleInputChange}
                      className="flex-1 rounded-l-none font-mono text-sm"
                    />
                  </div>
                ) : (
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
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Original URL</Label>
                {isEditing ? (
                  <textarea
                    name="originalUrl"
                    value={formData.originalUrl}
                    onChange={handleInputChange}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1 font-mono"
                  />
                ) : (
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
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Title</Label>
                {isEditing ? (
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.title}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.description}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Expires</Label>
                {isEditing ? (
                  <Input
                    name="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt.replace(' ', 'T')}
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                ) : (
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.expiresAt}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 pt-2 border-t">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Created</Label>
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.createdAt}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
                  <div className="mt-1 p-2 bg-muted rounded-md">
                    {linkData.updatedAt}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Switch
                    checked={isEditing ? formData.status : linkData.status === "active"}
                    onCheckedChange={isEditing ? handleStatusChange : undefined}
                    disabled={!isEditing}
                  />
                  <span className={cn(
                    "text-sm font-medium",
                    (isEditing ? formData.status : linkData.status === "active") ? "text-green-600" : "text-muted-foreground"
                  )}>
                    {(isEditing ? formData.status : linkData.status === "active") ? "Routing Enabled" : "Routing Disabled"}
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
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">QR Code</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" />
                    Show QR
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>QR Code for {linkData.title}</DialogTitle>
                    <DialogDescription>
                      Scan this code to open the short route directly.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col items-center justify-center p-6 space-y-4">
                    <div className="p-4 bg-white rounded-xl shadow-inner border">
                      <img
                        src={linkData.qrCode}
                        alt="QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-mono font-medium text-blue-600">{linkData.shortUrl}</p>
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-center">
                    <Button type="button" variant="secondary" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download Image
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-sm text-muted-foreground">
              Generate a QR code for your route to use in printed materials or offline campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
