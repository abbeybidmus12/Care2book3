import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Building2, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function Invoices() {
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [differentAmount, setDifferentAmount] = React.useState(false);
  const [invoices, setInvoices] = React.useState({
    pending: [
      {
        id: "INV001",
        period: "March 1-15, 2024",
        amount: 1250.0,
        status: "Pending",
        dueDate: "2024-03-31",
        shifts: 8,
        hours: 96,
        breakdown: {
          shiftCost: 1150.0,
          fees: 100.0,
        },
      },
    ],
    paid: [
      {
        id: "INV002",
        period: "February 15-28, 2024",
        amount: 960.0,
        status: "Paid",
        paidDate: "2024-03-15",
        shifts: 6,
        hours: 72,
        breakdown: {
          shiftCost: 900.0,
          fees: 60.0,
        },
      },
    ],
  });

  const markAsPaid = (invoice) => {
    setInvoices((prev) => ({
      pending: prev.pending.filter((i) => i.id !== invoice.id),
      paid: [
        ...prev.paid,
        {
          ...invoice,
          status: "Paid",
          paidDate: new Date().toISOString().split("T")[0],
        },
      ],
    }));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <>
      <AlertDialog open={showSuccess}>
        <AlertDialogContent>
          <AlertDialogTitle>Success</AlertDialogTitle>
          <AlertDialogDescription>
            Payment marked as successful
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Date Range</Label>
                <Input type="month" />
              </div>
              <div>
                <Label>Status</Label>
                <Input placeholder="Filter by status" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Statement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices List */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          {/* Pending Invoices */}
          <TabsContent value="pending" className="space-y-4">
            {invoices.pending.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-[2fr,1fr] gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Invoice #{invoice.id}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Period: {invoice.period}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Due: {invoice.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>
                            {invoice.shifts} shifts ({invoice.hours} hours)
                          </span>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Invoice Preview</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  Elite Care Agency
                                </h3>
                                <div className="text-sm text-muted-foreground">
                                  123 Agency Street
                                  <br />
                                  Manchester, M1 1AA
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold">
                                  Invoice #{invoice.id}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Date: {new Date().toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <h4 className="font-medium mb-2">Bill To:</h4>
                              <div className="text-sm">
                                Sunrise Care Home
                                <br />
                                456 Care Home Road
                                <br />
                                Manchester, M2 2BB
                              </div>
                            </div>

                            <div className="border rounded-lg overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-muted">
                                  <tr>
                                    <th className="p-2 text-left">Worker</th>
                                    <th className="p-2 text-left">Date</th>
                                    <th className="p-2 text-left">Shift</th>
                                    <th className="p-2 text-right">Hours</th>
                                    <th className="p-2 text-right">Rate</th>
                                    <th className="p-2 text-right">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[
                                    {
                                      workerId: "W12345",
                                      workerName: "John Doe",
                                      date: "2024-03-19",
                                      shift: "07:00 - 19:00",
                                      hours: 12,
                                      rate: 15,
                                      amount: 180,
                                    },
                                    {
                                      workerId: "W12346",
                                      workerName: "Jane Smith",
                                      date: "2024-03-20",
                                      shift: "07:00 - 19:00",
                                      hours: 12,
                                      rate: 15,
                                      amount: 180,
                                    },
                                  ].map((timesheet, index) => (
                                    <tr key={index} className="border-t">
                                      <td className="p-2">
                                        {timesheet.workerName}
                                        <div className="text-xs text-muted-foreground">
                                          ID: {timesheet.workerId}
                                        </div>
                                      </td>
                                      <td className="p-2">{timesheet.date}</td>
                                      <td className="p-2">{timesheet.shift}</td>
                                      <td className="p-2 text-right">
                                        {timesheet.hours}
                                      </td>
                                      <td className="p-2 text-right">
                                        £{timesheet.rate.toFixed(2)}
                                      </td>
                                      <td className="p-2 text-right">
                                        £{timesheet.amount.toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-muted/50">
                                  <tr className="border-t">
                                    <td
                                      colSpan={5}
                                      className="p-2 font-medium text-right"
                                    >
                                      Total Amount:
                                    </td>
                                    <td className="p-2 font-medium text-right">
                                      £{invoice.amount.toFixed(2)}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>

                            <div className="space-y-2 text-sm">
                              <div className="font-medium">Payment Terms:</div>
                              <div className="text-muted-foreground">
                                Payment is due within 30 days
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button>Download PDF</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">Make Payment</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Make Payment</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-4 bg-muted rounded-lg space-y-2">
                              <div className="flex justify-between">
                                <span>Invoice Amount:</span>
                                <span className="font-medium">
                                  £{invoice.amount.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Due Date:</span>
                                <span>{invoice.dueDate}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id="different-amount"
                                onCheckedChange={(checked) =>
                                  setDifferentAmount(!!checked)
                                }
                                checked={differentAmount}
                              />
                              <Label htmlFor="different-amount">
                                Pay a different amount
                              </Label>
                            </div>

                            <div className="space-y-2">
                              <Label>Payment Amount</Label>
                              <Input
                                type="number"
                                placeholder="Enter payment amount"
                                defaultValue={invoice.amount.toFixed(2)}
                                step="0.01"
                                disabled={!differentAmount}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Payment Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bank">
                                    Bank Transfer
                                  </SelectItem>
                                  <SelectItem value="card">
                                    Credit/Debit Card
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>Payment Reference</Label>
                              <Input placeholder="Enter payment reference number" />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="confirm" />
                              <Label htmlFor="confirm">
                                I confirm payment has been made
                              </Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={() => markAsPaid(invoice)}>
                              Mark as Paid
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold">
                        £{invoice.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Shifts: £{invoice.breakdown.shiftCost.toFixed(2)}
                        <br />
                        Fees: £{invoice.breakdown.fees.toFixed(2)}
                      </div>
                      <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        {invoice.status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Paid Invoices */}
          <TabsContent value="paid" className="space-y-4">
            {invoices.paid.map((invoice) => (
              <Card key={invoice.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-[2fr,1fr] gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          Invoice #{invoice.id}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Period: {invoice.period}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Paid: {invoice.paidDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>
                            {invoice.shifts} shifts ({invoice.hours} hours)
                          </span>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>

                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold">
                        £{invoice.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Shifts: £{invoice.breakdown.shiftCost.toFixed(2)}
                        <br />
                        Fees: £{invoice.breakdown.fees.toFixed(2)}
                      </div>
                      <div className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {invoice.status}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
