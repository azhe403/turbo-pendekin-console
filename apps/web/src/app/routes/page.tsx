"use client"

import { Button } from "@az/ui"
import {
    Card,
    CardContent,
} from "@az/ui"
import * as React from "react"
import { Search, Filter, Copy, BarChart2, ExternalLink, MoreHorizontal, Eye, Plus } from "lucide-react"
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'
import { routes } from '@/lib/routes';
import { CreateRouteModal } from '@/components/create-route-modal';

const links = [
    {
        id: "1",
        title: "Company Portfolio",
        originalUrl: "https://example.com/very-long-portfolio-url-that-needs-shortening",
        shortUrl: "az.id/port",
        clicks: 1240,
        createdAt: "2024-03-01",
        updatedAt: "2024-03-15",
    },
    {
        id: "2",
        title: "Summer Campaign 2024",
        originalUrl: "https://marketing.example.com/campaigns/summer-2024-discount-deals",
        shortUrl: "az.id/summer",
        clicks: 856,
        createdAt: "2024-03-05",
        updatedAt: "2024-03-12",
    },
    {
        id: "3",
        title: "Product Launch Documentation",
        originalUrl: "https://docs.example.com/v2/products/new-launch-details",
        shortUrl: "az.id/docs-v2",
        clicks: 432,
        createdAt: "2024-03-10",
        updatedAt: "2024-03-18",
    },
    {
        id: "4",
        title: "GitHub Repository",
        originalUrl: "https://github.com/username/awesome-project-repo-with-long-name",
        shortUrl: "az.id/github",
        clicks: 2891,
        createdAt: "2024-02-28",
        updatedAt: "2024-03-20",
    },
    {
        id: "5",
        title: "Event Registration Form",
        originalUrl: "https://forms.example.com/register-for-tech-conference-2024-spring",
        shortUrl: "az.id/register",
        clicks: 567,
        createdAt: "2024-03-12",
        updatedAt: "2024-03-14",
    },
    {
        id: "6",
        title: "YouTube Channel",
        originalUrl: "https://www.youtube.com/channel/UC1234567890abcdef/videos",
        shortUrl: "az.id/youtube",
        clicks: 3421,
        createdAt: "2024-02-15",
        updatedAt: "2024-03-19",
    },
    {
        id: "7",
        title: "LinkedIn Profile",
        originalUrl: "https://www.linkedin.com/in/john-doe-senior-developer-portfolio",
        shortUrl: "az.id/linkedin",
        clicks: 189,
        createdAt: "2024-03-08",
        updatedAt: "2024-03-08",
    },
    {
        id: "8",
        title: "Product Demo Video",
        originalUrl: "https://vimeo.com/1234567890/product-demo-presentation-extended",
        shortUrl: "az.id/demo",
        clicks: 923,
        createdAt: "2024-03-14",
        updatedAt: "2024-03-16",
    },
    {
        id: "9",
        title: "Support Documentation",
        originalUrl: "https://help.example.com/knowledgebase/troubleshooting-guide-advanced",
        shortUrl: "az.id/help",
        clicks: 145,
        createdAt: "2024-03-18",
        updatedAt: "2024-03-21",
    },
    {
        id: "10",
        title: "Newsletter Signup",
        originalUrl: "https://mailchimp.example.com/subscribe/weekly-tech-newsletter-2024",
        shortUrl: "az.id/news",
        clicks: 234,
        createdAt: "2024-03-20",
        updatedAt: "2024-03-22",
    },
]

export default function RoutesPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)

    // Check if URL has create parameter to open modal
    React.useEffect(() => {
        if (searchParams.get('create') === 'true') {
            setIsCreateModalOpen(true)
            // Clean up the URL
            router.replace('/routes')
        }
    }, [searchParams, router])

    return (
        <div className="flex flex-1 flex-col gap-6">
            <CreateRouteModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Routes</h1>
                    <p className="text-muted-foreground">
                        Manage and track your shortened URLs.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(true)}>
                        <Plus className="mr-2 size-4" />
                        Create Route
                    </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        placeholder="Search routes..."
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
                    <Card key={link.id} className="overflow-hidden transition-all hover:border-sidebar-ring/50 hover:shadow-md cursor-pointer">
                        <Link href={routes.linkDetail(link.id)}>
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-base hover:text-primary transition-colors">{link.title}</h3>
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

                                    <div className="flex items-center gap-6 text-center md:border-l md:pl-6">
                                        <div>
                                            <div className="text-lg font-bold">{link.clicks}</div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                                Clicks
                                            </p>
                                        </div>
                                        <div className="hidden sm:block">
                                            <div className="text-sm font-medium">{link.updatedAt}</div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                                                Updated
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-auto">
                                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                                            <ExternalLink className="size-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                                            <MoreHorizontal className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    )
}
