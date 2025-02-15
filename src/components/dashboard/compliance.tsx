import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, AlertTriangle, Clock } from "lucide-react";

export default function Compliance() {
  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Document Status
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
            <p className="text-xs text-muted-foreground">
              Documents up to date
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Documents need attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Days</div>
            <p className="text-xs text-muted-foreground">Until next review</p>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "DBS Certificate",
                status: "Valid",
                expiryDate: "2025-03-20",
                lastUpdated: "2024-03-20",
              },
              {
                name: "Right to Work",
                status: "Expiring Soon",
                expiryDate: "2024-04-15",
                lastUpdated: "2023-04-15",
              },
              {
                name: "Professional Insurance",
                status: "Valid",
                expiryDate: "2025-01-01",
                lastUpdated: "2024-01-01",
              },
              {
                name: "Nursing Registration",
                status: "Valid",
                expiryDate: "2024-12-31",
                lastUpdated: "2024-01-01",
              },
            ].map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-gray-500">
                    Last updated: {doc.lastUpdated}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <Badge
                    variant={doc.status === "Valid" ? "success" : "warning"}
                  >
                    {doc.status}
                  </Badge>
                  <p className="text-sm text-gray-500">
                    Expires: {doc.expiryDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Download All Documents</Button>
        <Button>Upload New Document</Button>
      </div>
    </div>
  );
}
