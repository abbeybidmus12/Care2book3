import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, FileText } from "lucide-react";

export default function Timesheet() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Export Timesheet
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheet entries would go here */}
      <div className="space-y-4">
        {[
          {
            date: "2024-03-20",
            shift: "Day Shift",
            hours: "12",
            status: "Pending",
          },
        ].map((entry, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">{entry.shift}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {entry.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{entry.hours} hours</div>
                  <div className="text-sm text-muted-foreground">
                    {entry.status}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
