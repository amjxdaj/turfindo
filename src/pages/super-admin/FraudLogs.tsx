
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FraudLogs: React.FC = () => {
  return (
    <div className="container px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Fraud Logs</h1>
      <Card>
        <CardHeader>
          <CardTitle>Cheating Monitor</CardTitle>
          <CardDescription>
            Track suspicious activities and potential fraud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This section will contain logs of cancelled matches and suspicious activities.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FraudLogs;
