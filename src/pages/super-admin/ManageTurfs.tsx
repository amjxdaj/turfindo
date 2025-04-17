
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ManageTurfs: React.FC = () => {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Turfs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Turf Management</CardTitle>
          <CardDescription>
            View, edit, and manage all turfs on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will contain a table of turfs with CRUD functionality.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTurfs;
