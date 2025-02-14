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
import { useState } from "react";

export default function Timesheet() {
  const [signature, setSignature] = useState("Click to sign");
  const [rating, setRating] = useState(0);

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
              <Label>Shift Type</Label>
              <Input placeholder="Filter by shift type" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timesheets List */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {/* Pending Approval */}
        <TabsContent value="pending" className="space-y-4">
          {[
            {
              id: "TS001",
              shiftTitle: "Healthcare Assistant",
              workerName: "Jane Smith",
              date: "2024-03-20",
              originalTime: "07:00 - 19:00",
              adjustedTime: "07:15 - 19:15",
              status: "Pending",
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
                        Worker: {timesheet.workerName}
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
                              <Label>Original Start</Label>
                              <Input value="07:00" disabled />
                            </div>
                            <div>
                              <Label>Original End</Label>
                              <Input value="19:00" disabled />
                            </div>
                            <div>
                              <Label>Adjusted Start</Label>
                              <Input value="07:15" disabled />
                            </div>
                            <div>
                              <Label>Adjusted End</Label>
                              <Input value="19:15" disabled />
                            </div>
                          </div>
                          <div>
                            <Label>Worker Notes</Label>
                            <Textarea
                              value="Arrived late due to traffic delay. Made up time at end of shift."
                              disabled
                            />
                          </div>
                          <div>
                            <Label>Worker Signature</Label>
                            <div className="p-3 bg-gray-50 rounded-lg text-sm font-mono">
                              John Doe - 2024-03-20 19:15
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Rate Worker Performance</Label>
                              <div className="flex items-center gap-2 mt-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                  >
                                    ★
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <Label>Review Notes</Label>
                              <Textarea placeholder="Add notes about your review decision" />
                            </div>
                          </div>
                          <div>
                            <Label>Care Hub Signature</Label>
                            <div
                              className="p-3 bg-gray-50 rounded-lg text-sm font-mono cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                const now = new Date();
                                const formattedDate = now.toLocaleDateString();
                                const formattedTime = now.toLocaleTimeString();
                                setSignature(
                                  `Sunrise Care Home - ${formattedDate} ${formattedTime}`,
                                );
                              }}
                            >
                              {signature}
                            </div>
                          </div>
                        </div>
                        <DialogFooter className="gap-2">
                          <Button variant="outline">Reject</Button>
                          <Button>Approve</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{timesheet.date}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      {timesheet.status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Approved */}
        <TabsContent value="approved" className="space-y-4">
          {[
            {
              id: "TS002",
              shiftTitle: "Healthcare Assistant",
              workerName: "John Doe",
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
                        Worker: {timesheet.workerName}
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

                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Timesheet
                    </Button>
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
                        Worker: {timesheet.workerName}
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

                    <Button size="sm">View Details</Button>
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
