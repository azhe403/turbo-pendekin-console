"use client"

import { Button } from '@az/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@az/ui';
import { Link2, TrendingUp, Users, BarChart3, Clock, ArrowUpRight, ArrowDownRight, ExternalLink, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }: { value: string; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
  const suffix = value.replace(/[\d.]/g, '');

  useEffect(() => {
    let startTime: number;
    let startValue = 0;
    const endValue = numericValue;

    const animate = (currentTime: number) => {
      if (startTime === undefined) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [numericValue, duration]);

  return (
    <span>
      {suffix === 'K' ? (displayValue / 1000).toFixed(1) : Math.floor(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Update time every second
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your URL shortener performance and analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value="2456" />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value="45.2K" />
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +23.1% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <AnimatedCounter value="3.2" />
              <span className="text-lg font-bold">%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clicks Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Clicks Overview</CardTitle>
            <CardDescription>
              Daily click activity for the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-muted rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                <p>Chart visualization would go here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Live Activity</CardTitle>
            <CardDescription>
              Real-time system status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Live Clicks</span>
                <span className="text-sm font-mono">
                  <AnimatedCounter value="127" duration={1000} />
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm font-mono text-green-600">42ms</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Updated</span>
                <span className="text-xs text-muted-foreground">
                  {mounted ? currentTime.toLocaleTimeString() : '--:--:--'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Links */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Links</CardTitle>
            <CardDescription>
              Latest created short links
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/links">
              View All
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "1",
                title: "Q4 Marketing Report",
                shortUrl: "az.id/q4-report",
                originalUrl: "https://docs.company.com/reports/2024/q4-marketing-analysis",
                clicks: 145,
                createdAt: "2 hours ago",
              },
              {
                id: "2",
                title: "Product Demo Video",
                shortUrl: "az.id/demo",
                originalUrl: "https://vimeo.com/1234567890/product-demo",
                clicks: 89,
                createdAt: "5 hours ago",
              },
              {
                id: "3",
                title: "Event Registration",
                shortUrl: "az.id/register",
                originalUrl: "https://events.company.com/tech-summit-2024",
                clicks: 234,
                createdAt: "1 day ago",
              },
              {
                id: "4",
                title: "Support Documentation",
                shortUrl: "az.id/help",
                originalUrl: "https://help.company.com/knowledgebase/troubleshooting",
                clicks: 67,
                createdAt: "2 days ago",
              },
              {
                id: "5",
                title: "Blog Post: Launch",
                shortUrl: "az.id/launch",
                originalUrl: "https://blog.company.com/2024/03/01/launch-announcement",
                clicks: 412,
                createdAt: "3 days ago",
              },
            ].map((link) => (
              <div key={link.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <Link href={`/links/${link.id}`} className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{link.title}</h4>
                    <span className="text-xs text-muted-foreground">{link.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{link.shortUrl}</span>
                    <span>•</span>
                    <span className="truncate">{link.clicks} clicks</span>
                  </div>
                </Link>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                  <Link href={`/links/${link.id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
