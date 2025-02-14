import { Button } from "@/components/ui/button";
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

export default function Invoices() {
  return (
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
              <Label>Care Hub</Label>
              <Input placeholder="Search by care hub" />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoices List */}
      <Tabs defaultValue="processing">
        <TabsList>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>

        {/* Processing Tab */}
        <TabsContent value="processing" className="space-y-4">
          {[
            {
              id: "INV001",
              careHub: "Sunrise Care Home",
              period: "March 1-15, 2024",
              timesheets: 8,
              totalHours: 96,
              amount: 1440.0,
              status: "Processing",
              addedAt: "2024-03-16 09:00",
            },
          ].map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {invoice.careHub}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {invoice.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Period: {invoice.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>
                          {invoice.timesheets} timesheets ({invoice.totalHours}{" "}
                          hours)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Preview Invoice
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
                                {invoice.careHub}
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
                                      colSpan={3}
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
                            <Button variant="outline">Download PDF</Button>
                            <Button>Send Invoice</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">Send Invoice</Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold">
                      £{invoice.amount.toFixed(2)}
                    </div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      {invoice.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Added: {invoice.addedAt}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Sent Tab */}
        <TabsContent value="sent" className="space-y-4">
          {[
            {
              id: "INV002",
              careHub: "Meadow View Care",
              period: "March 1-15, 2024",
              timesheets: 12,
              totalHours: 144,
              amount: 2160.0,
              status: "Sent",
              sentAt: "2024-03-16 10:00",
              dueDate: "2024-03-30",
            },
          ].map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {invoice.careHub}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {invoice.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Period: {invoice.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>
                          {invoice.timesheets} timesheets ({invoice.totalHours}{" "}
                          hours)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold">
                      £{invoice.amount.toFixed(2)}
                    </div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {invoice.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Sent: {invoice.sentAt}
                      <br />
                      Due: {invoice.dueDate}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Paid Tab */}
        <TabsContent value="paid" className="space-y-4">
          {[
            {
              id: "INV003",
              careHub: "Sunrise Care Home",
              period: "February 15-28, 2024",
              timesheets: 10,
              totalHours: 120,
              amount: 1800.0,
              status: "Paid",
              paidAt: "2024-03-14",
              paymentRef: "PAY-2024-003",
            },
          ].map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {invoice.careHub}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {invoice.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Period: {invoice.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        <span>
                          {invoice.timesheets} timesheets ({invoice.totalHours}{" "}
                          hours)
                        </span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold">
                      £{invoice.amount.toFixed(2)}
                    </div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {invoice.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Paid: {invoice.paidAt}
                      <br />
                      Ref: {invoice.paymentRef}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
