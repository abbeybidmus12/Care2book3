import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileCheck, AlertTriangle, Users, Search } from "lucide-react";

export default function CareHubCompliance() {
  return (
    <div className="p-6 space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Compliance
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Workers compliant</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Attention Required
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Workers need updates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Workers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Total workers</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Search Workers</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name or ID" className="pl-8" />
              </div>
            </div>
            <div>
              <Label>Document Type</Label>
              <Input placeholder="Filter by document type" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workers Compliance List */}
      <Card>
        <CardHeader>
          <CardTitle>Workers Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "John Doe",
                id: "W001",
                role: "Healthcare Assistant",
                documents: [
                  { name: "DBS", status: "Valid", expiry: "2025-03-20" },
                  {
                    name: "Right to Work",
                    status: "Expiring",
                    expiry: "2024-04-15",
                  },
                  { name: "Training", status: "Valid", expiry: "2024-12-31" },
                ],
                overallStatus: "Attention Required",
              },
              {
                name: "Jane Smith",
                id: "W002",
                role: "Registered Nurse",
                documents: [
                  { name: "DBS", status: "Valid", expiry: "2025-06-15" },
                  {
                    name: "NMC Registration",
                    status: "Valid",
                    expiry: "2024-12-31",
                  },
                  {
                    name: "Right to Work",
                    status: "Valid",
                    expiry: "2025-01-01",
                  },
                ],
                overallStatus: "Compliant",
              },
            ].map((worker, i) => (
              <div key={i} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{worker.name}</h3>
                    <p className="text-sm text-gray-500">
                      {worker.id} - {worker.role}
                    </p>
                  </div>
                  <Badge
                    variant={
                      worker.overallStatus === "Compliant"
                        ? "success"
                        : "warning"
                    }
                  >
                    {worker.overallStatus}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {worker.documents.map((doc, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-500">
                          Expires: {doc.expiry}
                        </span>
                        <Badge
                          variant={
                            doc.status === "Valid" ? "success" : "warning"
                          }
                          className="text-xs"
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">Update Documents</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
