"use client"

import { Button } from "@az/ui"
import {
    Card,
    CardContent,
} from "@az/ui"
import {
    Plus,
    ExternalLink,
    Copy,
    BarChart2,
    MoreHorizontal,
    Search,
    Filter
} from "lucide-react"

const links = [
    {
        id: "1",
        title: "Company Portfolio",
        originalUrl: "https://example.com/very-long-portfolio-url-that-needs-shortening",
        shortUrl: "az.id/port",
        clicks: 1240,
        createdAt: "2024-03-01",
    },
    {
        id: "2",
        title: "Summer Campaign 2024",
        originalUrl: "https://marketing.example.com/campaigns/summer-2024-discount-deals",
        shortUrl: "az.id/summer",
        clicks: 856,
        createdAt: "2024-03-05",
    },
    {
        id: "3",
        title: "Product Launch Documentation",
        originalUrl: "https://docs.example.com/v2/products/new-launch-details",
        shortUrl: "az.id/docs-v2",
        clicks: 432,
        createdAt: "2024-03-10",
    },
]

export default function LinksPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Links</h1>
                    <p className="text-muted-foreground">
                        Manage and track your shortened URLs.
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="size-4" />
                    Create Link
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        placeholder="Search links..."
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="size-4" />
                    Filter
                </Button>
            </div>

            <div className="grid gap-4">
                {links.map((link) => (
                    <Card key={link.id} className="overflow-hidden transition-all hover:border-sidebar-ring/50 hover:shadow-md">
                        <CardContent className="p-0">
                            <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{link.title}</h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                                            Active
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                                        <span className="cursor-pointer hover:underline">{link.shortUrl}</span>
                                        <button className="text-muted-foreground hover:text-foreground">
                                            <Copy className="size-3" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate max-w-md">
                                        {link.originalUrl}
                                    </p>
                                </div>

                                <div className="flex items-center gap-8 text-center md:border-l md:pl-8">
                                    <div>
                                        <div className="text-2xl font-bold">{link.clicks}</div>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                            Clicks
                                        </p>
                                    </div>
                                    <div className="hidden sm:block">
                                        <div className="text-sm font-medium">{link.createdAt}</div>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                            Created
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-auto">
                                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                                        <BarChart2 className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                                        <ExternalLink className="size-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                                        <MoreHorizontal className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
