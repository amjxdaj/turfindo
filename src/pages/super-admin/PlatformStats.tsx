
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PlatformStats: React.FC = () => {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Platform Statistics</h1>
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
          <CardDescription>
            View detailed statistics and reports about platform activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will contain charts and graphs showing platform statistics.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformStats;
