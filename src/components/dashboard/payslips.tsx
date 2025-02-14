import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Download,
  FileText,
  PoundSterling,
  Clock,
  Building2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Payslips() {
  const payslips = [
    {
      id: "PS001",
      period: "March 2024 - Week 4",
      dateFrom: "2024-03-25",
      dateTo: "2024-03-31",
      shifts: [
        {
          id: "SH001",
          date: "2024-03-25",
          careHub: "Sunrise Care Home",
          role: "Healthcare Assistant",
          hours: 12,
          rate: 15,
          amount: 180,
        },
        {
          id: "SH002",
          date: "2024-03-27",
          careHub: "Meadow View Care",
          role: "Support Worker",
          hours: 8,
          rate: 16,
          amount: 128,
        },
      ],
      totalHours: 20,
      grossPay: 308,
      deductions: 61.6,
      netPay: 246.4,
      status: "Paid",
      paidOn: "2024-04-01",
    },
    {
      id: "PS002",
      period: "March 2024 - Week 3",
      dateFrom: "2024-03-18",
      dateTo: "2024-03-24",
      shifts: [
        {
          id: "SH003",
          date: "2024-03-20",
          careHub: "Sunrise Care Home",
          role: "Healthcare Assistant",
          hours: 12,
          rate: 15,
          amount: 180,
        },
      ],
      totalHours: 12,
      grossPay: 180,
      deductions: 36,
      netPay: 144,
      status: "Paid",
      paidOn: "2024-03-25",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-muted-foreground">This Month</Label>
              <div className="text-2xl font-bold">£488.00</div>
              <div className="text-sm text-muted-foreground">Net earnings</div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Total Hours</Label>
              <div className="text-2xl font-bold">32</div>
              <div className="text-sm text-muted-foreground">Hours worked</div>
            </div>
            <div className="space-y-2">
              <Label className="text-muted-foreground">Average Rate</Label>
              <div className="text-2xl font-bold">£15.25</div>
              <div className="text-sm text-muted-foreground">Per hour</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="month" />
            </div>
            <div>
              <Label>Care Hub</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Care Hubs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Care Hubs</SelectItem>
                  <SelectItem value="sunrise">Sunrise Care Home</SelectItem>
                  <SelectItem value="meadow">Meadow View Care</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Tax Statement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payslips List */}
      <div className="space-y-4">
        {payslips.map((payslip) => (
          <Card key={payslip.id}>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{payslip.period}</h3>
                    <div className="text-sm text-muted-foreground">
                      {payslip.dateFrom} to {payslip.dateTo}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      £{payslip.netPay.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Net payment
                    </div>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {payslip.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shifts List */}
                <div className="space-y-3">
                  <Label>Shifts</Label>
                  {payslip.shifts.map((shift) => (
                    <div
                      key={shift.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">{shift.role}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          {shift.careHub}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {shift.date} ({shift.hours} hours)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          £{shift.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @ £{shift.rate}/hr
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Gross Pay</span>
                    <span>£{payslip.grossPay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Deductions</span>
                    <span>-£{payslip.deductions.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Net Pay</span>
                    <span>£{payslip.netPay.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Paid on: {payslip.paidOn}
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Payslip
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
