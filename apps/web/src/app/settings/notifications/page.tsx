"use client"

import { Button, Label, Separator } from "@az/ui"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@az/ui"
import {
} from "lucide-react"

export default function NotificationsSettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
                <p className="text-muted-foreground">
                    Manage your email, push, and in-app notifications.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6 max-w-4xl">
                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>
                                Choose which emails you want to receive.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Security Alerts</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive emails about your account security.
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Weekly Analytics Report</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get a summary of your link clicks every week.
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">New Feature Announcements</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Stay updated with the latest updates.
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm">Disabled</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Push Notifications</CardTitle>
                            <CardDescription>
                                Configure push notifications for your browser and mobile.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Direct Messages</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive notifications for new messages.
                                    </p>
                                </div>
                                <Button variant="outline" size="sm">Enabled</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base font-semibold">Link Milestone Alerts</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Get notified when your links reach click milestones.
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm">Disabled</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
