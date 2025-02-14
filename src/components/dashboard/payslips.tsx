import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText } from "lucide-react";

export default function Payslips() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="month" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[
          {
            period: "March 2024",
            amount: "£2,450.00",
            date: "2024-03-31",
            status: "Pending",
          },
        ].map((payslip, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h3 className="font-medium">Pay Period: {payslip.period}</h3>
                  <div className="text-sm text-muted-foreground">
                    Payment Date: {payslip.date}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-2xl font-bold">{payslip.amount}</div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
