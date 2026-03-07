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
    Shield,
    Lock,
    Key,
    Smartphone
} from "lucide-react"

export default function SecuritySettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
                <p className="text-muted-foreground">
                    Manage your password, security preferences, and two-factor authentication.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="space-y-6 max-w-4xl">
                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/50 px-6 py-4 flex justify-end">
                            <Button>Update Password</Button>
                        </CardFooter>
                    </Card>

                    <Card className="transition-all hover:border-sidebar-ring/30">
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>
                                Add an extra layer of security to your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Smartphone className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-semibold">Authenticator App</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Use an app like Google Authenticator or 1Password.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="outline">Setup</Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                        <Lock className="size-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-semibold">Recovery Codes</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Generate backup codes for emergency access.
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" disabled>Generate</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
