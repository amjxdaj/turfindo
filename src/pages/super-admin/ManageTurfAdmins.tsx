
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ManageTurfAdmins: React.FC = () => {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Manage Turf Admins</h1>
      <Card>
        <CardHeader>
          <CardTitle>Turf Admin Management</CardTitle>
          <CardDescription>
            View, edit, and manage turf administrators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will contain a table of turf admins with CRUD functionality.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageTurfAdmins;
