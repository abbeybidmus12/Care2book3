import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Download,
  FileCheck,
  AlertCircle,
  Edit,
  Check,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Timesheet() {
  const [signature, setSignature] = useState("");
  const [resubmitSignature, setResubmitSignature] = useState("");

  // In a real app, this would come from user context/auth
  const workerName = "John Doe";

  const handleSign = (setterFn: (value: string) => void) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    setterFn(`${workerName} - ${formattedDate} ${formattedTime}`);
  };

  const timesheets = {
    pendingSubmission: [
      {
        id: "TS001",
        title: "Healthcare Assistant - Day Shift",
        careHub: "Sunrise Care Home",
        date: "2024-03-15",
        scheduledTime: "07:00 - 19:00",
        actualTime: "07:00 - 19:00",
        hourlyRate: 15,
        totalHours: 12,
        estimatedPay: 180,
        requiresAdjustment: false,
        signed: false,
      },
    ],
    pendingApproval: [
      {
        id: "TS002",
        title: "Support Worker - Night Shift",
        careHub: "Meadow View Care",
        date: "2024-03-14",
        scheduledTime: "19:00 - 07:00",
        actualTime: "19:15 - 07:00",
        hourlyRate: 16,
        totalHours: 11.75,
        estimatedPay: 188,
        submittedAt: "2024-03-15 07:30",
        adjustmentReason: "Started 15 minutes late due to traffic",
      },
    ],
    approved: [
      {
        id: "TS003",
        title: "Healthcare Assistant - Day Shift",
        careHub: "Sunrise Care Home",
        date: "2024-03-13",
        scheduledTime: "07:00 - 19:00",
        actualTime: "07:00 - 19:00",
        hourlyRate: 15,
        totalHours: 12,
        finalPay: 180,
        approvedAt: "2024-03-14 09:00",
        approvedBy: "Sarah Manager",
      },
    ],
    rejected: [
      {
        id: "TS004",
        title: "Support Worker - Day Shift",
        careHub: "Meadow View Care",
        date: "2024-03-12",
        scheduledTime: "07:00 - 19:00",
        actualTime: "07:30 - 19:30",
        hourlyRate: 16,
        totalHours: 12,
        estimatedPay: 192,
        rejectedAt: "2024-03-13 10:00",
        rejectedBy: "John Supervisor",
        rejectionReason:
          "Timesheet hours don't match sign-in records. Please adjust actual start and end times.",
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Care Home</Label>
              <Input placeholder="Search care homes" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheets List */}
      <Tabs defaultValue="pendingSubmission">
        <TabsList>
          <TabsTrigger value="pendingSubmission">
            Pending Submission
          </TabsTrigger>
          <TabsTrigger value="pendingApproval">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {/* Pending Submission */}
        <TabsContent value="pendingSubmission" className="space-y-4">
          {timesheets.pendingSubmission.map((timesheet) => (
            <Card key={timesheet.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {timesheet.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {timesheet.careHub} - ID: {timesheet.id}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label>Scheduled Time</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {timesheet.scheduledTime}
                        </div>
                      </div>
                      <div>
                        <Label>Estimated Pay</Label>
                        <div className="font-medium">
                          £{timesheet.estimatedPay}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {timesheet.totalHours} hrs @ £{timesheet.hourlyRate}
                          /hr
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <FileCheck className="h-4 w-4 mr-2" />
                          Submit Timesheet
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Submit Timesheet</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Actual Start Time</Label>
                            <Input type="time" defaultValue="07:00" />
                          </div>
                          <div>
                            <Label>Actual End Time</Label>
                            <Input type="time" defaultValue="19:00" />
                          </div>
                          <div>
                            <Label>Break Duration (minutes)</Label>
                            <Input type="number" defaultValue="60" />
                          </div>
                          <div>
                            <Label>Additional Notes</Label>
                            <Textarea placeholder="Add any notes about your shift" />
                          </div>
                          <div
                            onClick={() => handleSign(setSignature)}
                            className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {signature ? "Signed" : "Click to Sign"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {signature || "No signature added"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button disabled={!signature}>Submit</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{timesheet.date}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Pending Submission
                    </div>
                    {!timesheet.signed && (
                      <div className="text-xs text-red-600">
                        Signature Required
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Other tabs remain the same */}
        <TabsContent value="pendingApproval" className="space-y-4">
          {/* ... */}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {/* ... */}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {timesheets.rejected.map((timesheet) => (
            <Card key={timesheet.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {timesheet.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {timesheet.careHub} - ID: {timesheet.id}
                      </div>
                    </div>

                    <div className="text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 inline mr-2" />
                      {timesheet.rejectionReason}
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit & Resubmit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit & Resubmit Timesheet</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Actual Start Time</Label>
                            <Input type="time" defaultValue="07:30" />
                          </div>
                          <div>
                            <Label>Actual End Time</Label>
                            <Input type="time" defaultValue="19:30" />
                          </div>
                          <div>
                            <Label>Break Duration (minutes)</Label>
                            <Input type="number" defaultValue="60" />
                          </div>
                          <div>
                            <Label>Additional Notes</Label>
                            <Textarea placeholder="Add any notes about your shift" />
                          </div>
                          <div
                            onClick={() => handleSign(setResubmitSignature)}
                            className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                            <div className="space-y-1">
                              <div className="text-sm font-medium">
                                {resubmitSignature ? "Signed" : "Click to Sign"}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {resubmitSignature || "No signature added"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Cancel</Button>
                          <Button disabled={!resubmitSignature}>
                            Resubmit
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{timesheet.date}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      Rejected
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rejected by: {timesheet.rejectedBy}
                      <br />
                      {timesheet.rejectedAt}
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
