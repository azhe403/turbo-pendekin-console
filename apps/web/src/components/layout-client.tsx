"use client"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@az/ui";
import { AppSidebar } from "./app-sidebar";
import { ModeToggle } from "./mode-toggle";

export function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset className="transition-all duration-200 ease-in-out">
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                    <ModeToggle />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
