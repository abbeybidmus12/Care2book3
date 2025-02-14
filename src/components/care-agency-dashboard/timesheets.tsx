import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Timesheets() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Care Worker</Label>
              <Input placeholder="Search by worker" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
            <div>
              <Label>Care Hub</Label>
              <Input placeholder="Filter by care hub" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheets List */}
      <Tabs defaultValue="approved">
        <TabsList>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {/* Approved */}
        <TabsContent value="approved" className="space-y-4">
          {[
            {
              id: "TS002",
              shiftTitle: "Healthcare Assistant",
              workerName: "John Doe",
              workerId: "W12345",
              date: "2024-03-19",
              originalTime: "07:00 - 19:00",
              adjustedTime: "07:00 - 19:00",
              status: "Approved",
              approvedBy: "Sarah Manager",
              approvedAt: "2024-03-20 09:00",
              workerNotes: "Shift completed as scheduled",
              careHubNotes: "All duties completed satisfactorily",
              workerSignature: "John Doe - 2024-03-19 19:00",
              careHubSignature: "Sunrise Care Home - 2024-03-20 09:00",
              rating: 4,
            },
          ].map((timesheet) => (
            <Card key={timesheet.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {timesheet.shiftTitle}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {timesheet.id}
                      </div>
                      <div className="text-sm font-medium mt-1">
                        Worker: {timesheet.workerName} (ID: {timesheet.workerId}
                        )
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <div>
                          <div>Time: {timesheet.adjustedTime}</div>
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Timesheet Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Original Time</Label>
                              <Input value={timesheet.originalTime} disabled />
                            </div>
                            <div>
                              <Label>Actual Time</Label>
                              <Input value={timesheet.adjustedTime} disabled />
                            </div>
                          </div>
                          <div>
                            <Label>Worker Notes</Label>
                            <Textarea value={timesheet.workerNotes} disabled />
                          </div>
                          <div>
                            <Label>Care Hub Notes</Label>
                            <Textarea value={timesheet.careHubNotes} disabled />
                          </div>
                          <div>
                            <Label>Worker Rating</Label>
                            <div className="text-xl text-yellow-400">
                              {"★".repeat(timesheet.rating)}
                              {"☆".repeat(5 - timesheet.rating)}
                            </div>
                          </div>
                          <div>
                            <Label>Worker Signature</Label>
                            <div className="p-3 bg-gray-50 rounded-lg text-sm font-mono">
                              {timesheet.workerSignature}
                            </div>
                          </div>
                          <div>
                            <Label>Care Hub Signature</Label>
                            <div className="p-3 bg-gray-50 rounded-lg text-sm font-mono">
                              {timesheet.careHubSignature}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() => {
                              // Add timesheet to invoice processing
                              // This would typically update a state or make an API call
                              alert("Timesheet added for invoice processing");
                            }}
                          >
                            Add for Invoice Processing
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{timesheet.date}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {timesheet.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Approved by: {timesheet.approvedBy}
                      <br />
                      {timesheet.approvedAt}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Rejected */}
        <TabsContent value="rejected" className="space-y-4">
          {[
            {
              id: "TS003",
              shiftTitle: "Healthcare Assistant",
              workerName: "Alice Brown",
              workerId: "W12346",
              date: "2024-03-18",
              originalTime: "07:00 - 19:00",
              adjustedTime: "07:30 - 19:30",
              status: "Rejected",
              rejectedBy: "John Supervisor",
              rejectedAt: "2024-03-19 10:00",
              reason: "Hours mismatch with timesheet",
              workerSignature: "Alice Brown - 2024-03-18 19:30",
              careHubSignature: "Sunrise Care Home - 2024-03-19 10:00",
            },
          ].map((timesheet) => (
            <Card key={timesheet.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {timesheet.shiftTitle}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {timesheet.id}
                      </div>
                      <div className="text-sm font-medium mt-1">
                        Worker: {timesheet.workerName} (ID: {timesheet.workerId}
                        )
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <div>
                          <div>Original: {timesheet.originalTime}</div>
                          <div>Adjusted: {timesheet.adjustedTime}</div>
                        </div>
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">View Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Timesheet Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Original Time</Label>
                              <Input value={timesheet.originalTime} disabled />
                            </div>
                            <div>
                              <Label>Adjusted Time</Label>
                              <Input value={timesheet.adjustedTime} disabled />
                            </div>
                          </div>
                          <div>
                            <Label>Rejection Reason</Label>
                            <Textarea value={timesheet.reason} disabled />
                          </div>
                          <div>
                            <Label>Worker Signature</Label>
                            <div className="p-3 bg-gray-50 rounded-lg text-sm font-mono">
                              {timesheet.workerSignature}
                            </div>
                          </div>
                          <div>
                            <Label>Care Hub Signature</Label>
                            <div className="p-3 bg-gray-50 rounded-lg text-sm font-mono">
                              {timesheet.careHubSignature}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{timesheet.date}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      {timesheet.status}
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
