"use client"

import { Button, Input, Label, Separator } from "@az/ui"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@az/ui"
import {
    Database,
    Webhook,
    Key,
    Plus,
    Github,
    Slack
} from "lucide-react"

export default function IntegrationsSettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
                <p className="text-muted-foreground">
                    Connect your account with external services and manage API access.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6 max-w-4xl">
                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>API Keys</CardTitle>
                            <CardDescription>
                                Use these keys to authenticate your requests to our API.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Production Key</p>
                                    <code className="text-xs text-muted-foreground">sk_live_••••••••••••••••••••</code>
                                </div>
                                <Button variant="outline" size="sm">Revoke</Button>
                            </div>
                            <Button className="w-full gap-2" variant="secondary">
                                <Plus className="size-4" />
                                Generate New API Key
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Connected Apps</CardTitle>
                            <CardDescription>
                                Manage third-party applications with access to your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Github className="size-8" />
                                    <div>
                                        <p className="text-sm font-medium">GitHub</p>
                                        <p className="text-xs text-muted-foreground">Connected on March 1, 2024</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-destructive">Disconnect</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between p-3 border rounded-lg border-dashed">
                                <div className="flex items-center gap-3">
                                    <Slack className="size-8 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Slack</p>
                                        <p className="text-xs text-muted-foreground">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Connect</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
