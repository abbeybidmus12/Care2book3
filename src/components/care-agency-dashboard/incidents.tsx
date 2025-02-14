import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, FileText, MessageSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Incidents() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Button size="lg">
          <AlertCircle className="h-4 w-4 mr-2" />
          Report New Incident
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Incident Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="late">Late Arrival</SelectItem>
                  <SelectItem value="misconduct">Misconduct</SelectItem>
                  <SelectItem value="injury">Workplace Injury</SelectItem>
                  <SelectItem value="complaint">Client Complaint</SelectItem>
                  <SelectItem value="policy">Policy Violation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">
                    Under Investigation
                  </SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Worker</Label>
              <Input placeholder="Search by worker" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents List */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Open</TabsTrigger>
          <TabsTrigger value="investigating">Under Investigation</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
        </TabsList>

        {/* Pending Incidents */}
        <TabsContent value="pending" className="space-y-4">
          {[
            {
              id: "INC001",
              type: "Late Arrival",
              date: "2024-03-20",
              time: "07:30",
              worker: "Jane Smith",
              shift: "SH123",
              reportedBy: "Sarah Manager",
              description: "Worker arrived 30 minutes late for morning shift",
              status: "Pending Review",
            },
          ].map((incident) => (
            <Card key={incident.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {incident.type}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{incident.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Worker: {incident.worker}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {incident.date} at {incident.time}
                      </div>
                    </div>

                    <div className="text-sm space-y-2">
                      <div>
                        <span className="font-medium">Shift ID:</span>{" "}
                        {incident.shift}
                      </div>
                      <div>
                        <span className="font-medium">Reported By:</span>{" "}
                        {incident.reportedBy}
                      </div>
                      <div className="text-muted-foreground">
                        {incident.description}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Review Incident</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Assessment</Label>
                            <Textarea placeholder="Enter your assessment of the incident" />
                          </div>
                          <div>
                            <Label>Action Required</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select action" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="warning">
                                  Issue Warning
                                </SelectItem>
                                <SelectItem value="training">
                                  Additional Training
                                </SelectItem>
                                <SelectItem value="suspension">
                                  Temporary Suspension
                                </SelectItem>
                                <SelectItem value="dismiss">
                                  Dismiss Incident
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline">Dismiss</Button>
                          <Button>Start Investigation</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge variant="secondary">{incident.status}</Badge>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Worker
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Shift Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Under Investigation */}
        <TabsContent value="investigating" className="space-y-4">
          {[
            {
              id: "INC002",
              type: "Policy Violation",
              date: "2024-03-19",
              worker: "John Doe",
              investigator: "Mark Supervisor",
              startedAt: "2024-03-19 14:00",
              status: "Under Investigation",
              description:
                "Reported non-compliance with medication administration protocol",
              evidence: [
                "Medication log",
                "CCTV footage",
                "Witness statements",
              ],
              nextSteps: "Scheduled meeting with worker for March 21",
            },
          ].map((incident) => (
            <Card key={incident.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {incident.type}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{incident.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Worker: {incident.worker}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Investigator:</span>{" "}
                        {incident.investigator}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Started:</span>{" "}
                        {incident.startedAt}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Next Steps:</span>{" "}
                        {incident.nextSteps}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Evidence Collected</Label>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {incident.evidence.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Update Investigation
                      </Button>
                      <Button>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Mark as Resolved
                      </Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge variant="secondary">{incident.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Resolved */}
        <TabsContent value="resolved" className="space-y-4">
          {[
            {
              id: "INC003",
              type: "Client Complaint",
              date: "2024-03-18",
              worker: "Alice Brown",
              resolvedBy: "Sarah Manager",
              resolvedAt: "2024-03-19 10:00",
              resolution: "Warning issued",
              actionTaken: "Verbal warning and additional training scheduled",
              followUpDate: "2024-04-18",
            },
          ].map((incident) => (
            <Card key={incident.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {incident.type}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{incident.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Worker: {incident.worker}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Resolution:</span>{" "}
                        {incident.resolution}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Action Taken:</span>{" "}
                        {incident.actionTaken}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Follow-up Date:</span>{" "}
                        {incident.followUpDate}
                      </div>
                    </div>

                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Full Report
                    </Button>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge variant="success">Resolved</Badge>
                    <div className="text-sm text-muted-foreground">
                      Resolved by: {incident.resolvedBy}
                      <br />
                      {incident.resolvedAt}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Dismissed */}
        <TabsContent value="dismissed" className="space-y-4">
          {[
            {
              id: "INC004",
              type: "Late Arrival",
              date: "2024-03-17",
              worker: "James Wilson",
              dismissedBy: "John Supervisor",
              dismissedAt: "2024-03-17 11:00",
              reason: "Valid explanation provided with supporting evidence",
            },
          ].map((incident) => (
            <Card key={incident.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {incident.type}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{incident.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Worker: {incident.worker}
                      </div>
                    </div>

                    <div className="text-sm">
                      <span className="font-medium">Dismissal Reason:</span>
                      <br />
                      {incident.reason}
                    </div>

                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>

                  <div className="text-right space-y-2">
                    <Badge variant="secondary">Dismissed</Badge>
                    <div className="text-sm text-muted-foreground">
                      Dismissed by: {incident.dismissedBy}
                      <br />
                      {incident.dismissedAt}
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
