"use client"

import { Button } from '@az/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@az/ui';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>
              Active users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <Button className="mt-4">View Details</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>
              Total revenue this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <Button variant="outline" className="mt-4">View Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>
              System performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <Button variant="secondary" className="mt-4">View Metrics</Button>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
