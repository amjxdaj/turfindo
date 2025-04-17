
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminDashboard: React.FC = () => {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Super Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Super Admin Dashboard</CardTitle>
          <CardDescription>
            Manage users, turf admins, turfs, and view platform statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will contain overview statistics and quick actions for Super Admin.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
