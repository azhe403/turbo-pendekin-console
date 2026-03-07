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
    User,
    Shield,
    Bell,
    Database,
    Globe
} from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-8">
                <aside className="space-y-1">
                    <Button variant="secondary" className="w-full justify-start gap-3">
                        <User className="size-4" />
                        General
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                        <Shield className="size-4" />
                        Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                        <Bell className="size-4" />
                        Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                        <Database className="size-4" />
                        Integration
                    </Button>
                </aside>

                <div className="space-y-6">
                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>
                                This is how others will see you on the platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="johndoe" defaultValue="azhe403" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="user@example.com" defaultValue="user@example.com" />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 px-6 py-4 flex justify-end">
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Platform Preferences</CardTitle>
                            <CardDescription>
                                Customize your dashboard experience.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Switch between light and dark theme.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm">Auto</Button>
                                    <Button variant="secondary" size="sm">Dark</Button>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Language / Region</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Select your preferred language.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="size-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">English (US)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive/30 bg-destructive/5 transition-all hover:border-destructive/50">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>
                                Irreversible account actions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                                Deleting your account will result in permanent loss of all your shortened links and tracking data.
                            </p>
                            <Button variant="destructive">Delete Account</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
