import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, AlertCircle } from "lucide-react";

export default function ManageShifts() {
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
              <Label>Shift Type</Label>
              <Input placeholder="Filter by shift type" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
            <div>
              <Label>Worker</Label>
              <Input placeholder="Search by worker" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shifts List */}
      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open Shifts</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {/* Open Shifts */}
        <TabsContent value="open" className="space-y-4">
          {[
            {
              id: "SH001",
              title: "Healthcare Assistant",
              type: "Day Shift",
              date: "2024-03-20",
              time: "07:00 - 19:00",
              rate: "£15/hr",
            },
          ].map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.time}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel Shift
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Pending Shifts */}
        <TabsContent value="pending" className="space-y-4">
          {[
            {
              id: "SH002",
              title: "Healthcare Assistant",
              date: "2024-03-21",
              time: "19:00 - 07:00",
              rate: "£16/hr",
              worker: {
                name: "Jane Smith",
                rating: 4.8,
                completedShifts: 45,
              },
            },
          ].map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.time}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Name: {shift.worker.name}</div>
                        <div>Rating: {shift.worker.rating}/5</div>
                        <div>
                          Completed Shifts: {shift.worker.completedShifts}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Pending Approval
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Approved Shifts */}
        <TabsContent value="approved" className="space-y-4">
          {[
            {
              id: "SH003",
              title: "Healthcare Assistant",
              date: "2024-03-22",
              time: "07:00 - 19:00",
              rate: "£15/hr",
              worker: {
                name: "Jane Smith",
              },
            },
          ].map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.time}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Name: {shift.worker.name}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm">
                        Cancel Shift
                      </Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Approved
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* In Progress Shifts */}
        <TabsContent value="in-progress" className="space-y-4">
          {[
            {
              id: "SH004",
              title: "Healthcare Assistant",
              date: "2024-03-22",
              time: "07:00 - 19:00",
              rate: "£15/hr",
              worker: {
                name: "Jane Smith",
                startTime: "07:00",
              },
            },
          ].map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.time}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Name: {shift.worker.name}</div>
                        <div>Started at: {shift.worker.startTime}</div>
                      </div>
                    </div>

                    <Button size="sm">View Details</Button>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      In Progress
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Completed Shifts */}
        <TabsContent value="completed" className="space-y-4">
          {[
            {
              id: "SH005",
              title: "Healthcare Assistant",
              date: "2024-03-21",
              time: "07:00 - 19:00",
              rate: "£15/hr",
              worker: {
                name: "Jane Smith",
                completionTime: "19:00",
              },
              timesheetStatus: "Pending",
            },
          ].map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.time}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>Name: {shift.worker.name}</div>
                        <div>Completed at: {shift.worker.completionTime}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Timesheet
                      </Button>
                      <Button size="sm">Approve</Button>
                      <Button variant="destructive" size="sm">
                        Reject
                      </Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Timesheet {shift.timesheetStatus}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Cancelled Shifts */}
        <TabsContent value="cancelled" className="space-y-4">
          {[
            {
              id: "SH006",
              title: "Healthcare Assistant",
              date: "2024-03-20",
              time: "07:00 - 19:00",
              rate: "£15/hr",
              cancellationReason:
                "Staffing levels adjusted - no longer required",
            },
          ].map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.time}
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium mb-2">Cancellation Reason</h4>
                      <div className="text-sm text-red-600">
                        {shift.cancellationReason}
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      Cancelled
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
