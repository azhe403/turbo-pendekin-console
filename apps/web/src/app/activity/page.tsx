"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@az/ui"
import {
    Link as LinkIcon,
    BarChart3,
    Edit,
    Trash2,
    MousePointer2,
    Clock,
    ArrowRight,
    ExternalLink,
    Globe,
    Shield,
    Calendar,
    ChevronRight,
    Search,
    User,
    Activity
} from "lucide-react"
import { cn } from "@az/ui"

const activities = [
    {
        id: 1,
        type: "link_created",
        title: "New link created",
        description: "Created a short link for 'Marketing Campaign 2024'",
        time: "2 minutes ago",
        date: "2024-03-21 14:30:00",
        actor: "azhe403",
        icon: LinkIcon,
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
        details: {
            shortUrl: "az.id/promo-2024",
            originalUrl: "https://marketing.example.com/campaigns/summer-2024-discount-deals",
            tags: ["Marketing", "2024", "Summer"],
            location: "Jakarta, ID"
        }
    },
    {
        id: 2,
        type: "link_updated",
        title: "Link destination updated",
        description: "Updated the destination URL for 'az.id/summer-sale'",
        time: "45 minutes ago",
        date: "2024-03-21 13:45:00",
        actor: "azhe403",
        icon: Edit,
        iconColor: "text-orange-500",
        bgColor: "bg-orange-500/10",
        details: {
            shortUrl: "az.id/summer-sale",
            oldUrl: "https://shop.example.com/sale/v1",
            newUrl: "https://shop.example.com/sale/v2-updated"
        }
    },
    {
        id: 3,
        type: "milestone",
        title: "Link reached 1k clicks",
        description: "Your link 'az.id/product-launch' has reached its first 1,000 clicks",
        time: "2 hours ago",
        date: "2024-03-21 12:30:00",
        actor: "System Bot",
        icon: BarChart3,
        iconColor: "text-green-500",
        bgColor: "bg-green-500/10",
        details: {
            shortUrl: "az.id/product-launch",
            totalClicks: 1024,
            topSource: "Twitter / X",
            topRegion: "United States"
        }
    },
    {
        id: 4,
        type: "click",
        title: "High traffic detected",
        description: "Spike in traffic detected from LinkedIn for 'az.id/hiring'",
        time: "5 hours ago",
        date: "2024-03-21 09:30:00",
        actor: "Analytics Engine",
        icon: MousePointer2,
        iconColor: "text-purple-500",
        bgColor: "bg-purple-500/10",
        details: {
            shortUrl: "az.id/hiring",
            currentRps: 45,
            peakRps: 120,
            source: "LinkedIn Business"
        }
    },
    {
        id: 5,
        type: "link_deleted",
        title: "Link deleted",
        description: "Deleted short link 'az.id/old-promo-2023'",
        time: "Yesterday at 10:15 AM",
        date: "2024-03-20 10:15:00",
        actor: "azhe403",
        icon: Trash2,
        iconColor: "text-destructive",
        bgColor: "bg-destructive/10",
        details: {
            shortUrl: "az.id/old-promo-2023",
            reason: "Campaign Expired"
        }
    }
]

export default function ActivityPage() {
    const [selectedId, setSelectedId] = React.useState<number>(activities[0].id)
    const selectedActivity = activities.find(a => a.id === selectedId)

    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Link Activity</h1>
                <p className="text-muted-foreground">
                    Track all changes and performance updates for your shortened links.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[600px]">
                {/* Left Column: Activity List */}
                <Card className="lg:col-span-7 xl:col-span-8 flex flex-col overflow-hidden">
                    <CardHeader className="border-b bg-muted/30 py-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Recent Changes</CardTitle>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                {activities.length} Events
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 flex-1 overflow-y-auto">
                        <div className="divide-y divide-border">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className={cn(
                                        "group flex gap-3 p-4 transition-all cursor-pointer hover:bg-muted/50",
                                        selectedId === activity.id && "bg-sidebar-accent border-r-2 border-primary"
                                    )}
                                    onClick={() => setSelectedId(activity.id)}
                                >
                                    <div className={cn(
                                        "flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg",
                                        activity.bgColor
                                    )}>
                                        <activity.icon className={cn("size-4", activity.iconColor)} />
                                    </div>
                                    <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className={cn(
                                                "text-sm font-semibold truncate",
                                                selectedId === activity.id && "text-primary"
                                            )}>
                                                {activity.title}
                                            </p>
                                            <span className="text-[10px] whitespace-nowrap text-muted-foreground">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-1 italic font-mono">
                                            {activity.details.shortUrl}
                                        </p>
                                    </div>
                                    <ChevronRight className={cn(
                                        "size-4 self-center text-muted-foreground/30 group-hover:text-muted-foreground transition-colors",
                                        selectedId === activity.id && "text-primary"
                                    )} />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Detail View */}
                <Card className="lg:col-span-5 xl:col-span-4 flex flex-col overflow-hidden bg-muted/5">
                    {selectedActivity ? (
                        <>
                            <CardHeader className="border-b bg-background py-6">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "flex aspect-square size-12 shrink-0 items-center justify-center rounded-xl shadow-sm",
                                            selectedActivity.bgColor
                                        )}>
                                            <selectedActivity.icon className={cn("size-6", selectedActivity.iconColor)} />
                                        </div>
                                        <div className="min-w-0">
                                            <CardTitle className="text-xl mb-1 truncate">{selectedActivity.title}</CardTitle>
                                            <CardDescription className="flex items-center gap-1.5 text-xs sm:text-sm">
                                                <Clock className="size-3.5 shrink-0" />
                                                <span className="truncate">Occurred {selectedActivity.time} • {selectedActivity.date}</span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full sm:w-auto">
                                        <button className="flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                                            <ExternalLink className="mr-2 size-4" />
                                            Open Link
                                        </button>
                                        <button className="flex-1 sm:flex-none inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                                            View Analytics
                                        </button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-y-auto p-8 space-y-8">
                                {/* Activity Summary */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Search className="size-4" />
                                        Activity Summary
                                    </h3>
                                    <p className="text-lg leading-relaxed text-foreground/90 bg-background p-6 rounded-xl border border-border/50 shadow-sm">
                                        {selectedActivity.description}
                                    </p>
                                </div>

                                {/* Event Data Grid */}
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Link Data</h3>
                                        <div className="rounded-xl border bg-background divide-y divide-border overflow-hidden shadow-sm">
                                            <div className="flex flex-col p-4 gap-1.5">
                                                <span className="text-xs text-muted-foreground font-medium">Short URL</span>
                                                <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
                                                    {selectedActivity.details.shortUrl}
                                                </span>
                                            </div>

                                            {selectedActivity.type === "link_created" && (
                                                <div className="flex flex-col p-4 gap-1.5">
                                                    <span className="text-xs text-muted-foreground font-medium">Destination URL</span>
                                                    <span className="text-sm font-mono break-all">{selectedActivity.details.originalUrl}</span>
                                                </div>
                                            )}

                                            {selectedActivity.type === "link_updated" && (
                                                <>
                                                    <div className="flex flex-col p-4 gap-1.5">
                                                        <span className="text-xs text-muted-foreground font-medium">Old Destination</span>
                                                        <span className="text-sm font-mono opacity-50 line-through">{selectedActivity.details.oldUrl}</span>
                                                    </div>
                                                    <div className="flex flex-col p-4 gap-1.5">
                                                        <span className="text-xs text-muted-foreground font-medium">New Destination</span>
                                                        <span className="text-sm font-mono text-orange-600 font-medium">{selectedActivity.details.newUrl}</span>
                                                    </div>
                                                </>
                                            )}

                                            {selectedActivity.type === "milestone" && (
                                                <>
                                                    <div className="flex flex-col p-4 gap-1.5">
                                                        <span className="text-xs text-muted-foreground font-medium">Total Clicks</span>
                                                        <span className="text-lg font-bold text-green-600">{selectedActivity.details.totalClicks?.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex flex-col p-4 gap-1.5">
                                                        <span className="text-xs text-muted-foreground font-medium">Top Traffic Source</span>
                                                        <span className="text-sm font-medium">{selectedActivity.details.topSource}</span>
                                                    </div>
                                                </>
                                            )}

                                            {selectedActivity.type === "click" && (
                                                <>
                                                    <div className="flex flex-col p-4 gap-1.5">
                                                        <span className="text-xs text-muted-foreground font-medium">Request Load</span>
                                                        <span className="text-lg font-bold text-purple-600">{selectedActivity.details.peakRps} req/s</span>
                                                    </div>
                                                    <div className="flex flex-col p-4 gap-1.5">
                                                        <span className="text-xs text-muted-foreground font-medium">Traffic Origin</span>
                                                        <span className="text-sm font-medium">{selectedActivity.details.source}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Event Metadata</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="rounded-xl border bg-background p-4 space-y-5 shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                        <User className="size-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">Performed By</span>
                                                        <span className="text-sm font-medium">{selectedActivity.actor}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                        <Calendar className="size-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">Timestamp</span>
                                                        <span className="text-sm font-medium">{selectedActivity.date}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-xl border bg-background p-4 space-y-5 shadow-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                        <Globe className="size-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">Origin</span>
                                                        <span className="text-sm font-medium">Jakarta, Indonesia</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                                        <Shield className="size-4 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] text-muted-foreground font-bold uppercase">Verification</span>
                                                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-bold text-green-600 w-fit">
                                                            SYSTEM VERIFIED
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-12 text-center">
                            <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                <Activity className="size-8 opacity-20" />
                            </div>
                            <h3 className="text-lg font-semibold mb-1">No Activity Selected</h3>
                            <p className="max-w-xs text-sm">
                                Select an activity from the list on the left to view detailed information and metrics.
                            </p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
