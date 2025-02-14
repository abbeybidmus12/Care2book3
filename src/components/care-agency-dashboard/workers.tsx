import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileCheck, AlertCircle, Mail, Phone, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Workers() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search Workers</Label>
              <Input placeholder="Search by name or ID" />
            </div>
            <div>
              <Label>Role</Label>
              <Input placeholder="Filter by role" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
            <div>
              <Label>Registration Date</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workers List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Workers</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="under-review">Under Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        {/* All Workers */}
        <TabsContent value="all" className="space-y-4">
          {[
            {
              id: "W001",
              name: "Jane Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
              role: "Healthcare Assistant",
              status: "Pending Approval",
              registrationDate: "2024-03-20",
              contact: {
                email: "jane.smith@example.com",
                phone: "+44 123 456 7890",
              },
              documents: {
                total: 6,
                uploaded: 4,
                missing: ["DBS Certificate", "Right to Work"],
              },
            },
            {
              id: "W002",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              role: "Support Worker",
              status: "Under Review",
              registrationDate: "2024-03-18",
              contact: {
                email: "john.doe@example.com",
                phone: "+44 123 456 7891",
              },
              documents: {
                total: 6,
                verified: 4,
                pending: ["Reference Check", "DBS Verification"],
              },
            },
            {
              id: "W003",
              name: "Sarah Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              role: "Healthcare Assistant",
              status: "Approved",
              registrationDate: "2024-03-15",
              contact: {
                email: "sarah.johnson@example.com",
                phone: "+44 123 456 7892",
              },
              documents: {
                total: 6,
                verified: 6,
              },
            },
          ].map((worker) => (
            <Card key={worker.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[auto,1fr,auto] gap-6 items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={worker.avatar} />
                    <AvatarFallback>{worker.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{worker.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          #{worker.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {worker.role}
                      </div>
                    </div>

                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {worker.contact.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {worker.contact.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Registered: {worker.registrationDate}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      {worker.status === "Pending Approval" && (
                        <Button size="sm">Start Review</Button>
                      )}
                      {worker.status === "Under Review" && (
                        <Button size="sm">Complete Review</Button>
                      )}
                      {worker.status === "Approved" && (
                        <Button size="sm">Assign Shifts</Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge
                      variant={
                        worker.status === "Approved" ? "success" : "secondary"
                      }
                    >
                      {worker.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {worker.status === "Approved"
                        ? "Ready to work"
                        : `Documents: ${worker.documents.uploaded || worker.documents.verified}/${worker.documents.total}`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Pending Approval */}
        <TabsContent value="pending" className="space-y-4">
          {[
            {
              id: "W001",
              name: "Jane Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
              role: "Healthcare Assistant",
              status: "Pending Approval",
              registrationDate: "2024-03-20",
              contact: {
                email: "jane.smith@example.com",
                phone: "+44 123 456 7890",
              },
              documents: {
                total: 6,
                uploaded: 4,
                missing: ["DBS Certificate", "Right to Work"],
              },
            },
          ].map((worker) => (
            <Card key={worker.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[auto,1fr,auto] gap-6 items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={worker.avatar} />
                    <AvatarFallback>{worker.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{worker.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          #{worker.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {worker.role}
                      </div>
                    </div>

                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {worker.contact.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {worker.contact.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Registered: {worker.registrationDate}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Worker Profile</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={worker.avatar} />
                                  <AvatarFallback>
                                    {worker.name[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-lg">
                                    {worker.name}
                                  </h3>
                                  <div className="text-sm text-muted-foreground">
                                    {worker.role}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium">Contact Details</h4>
                                <div className="grid gap-1 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {worker.contact.email}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    {worker.contact.phone}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium">
                                  Documents Status
                                </h4>
                                <div className="grid gap-2">
                                  <div className="flex items-center justify-between text-sm">
                                    <span>Documents Uploaded:</span>
                                    <span>
                                      {worker.documents.uploaded}/
                                      {worker.documents.total}
                                    </span>
                                  </div>
                                  {worker.documents.missing.length > 0 && (
                                    <div className="text-sm text-red-600">
                                      Missing Documents:
                                      <ul className="list-disc list-inside mt-1">
                                        {worker.documents.missing.map(
                                          (doc, index) => (
                                            <li key={index}>{doc}</li>
                                          ),
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="space-y-2">
                                <h4 className="font-medium">References</h4>
                                <div className="grid gap-4">
                                  <Button variant="outline" size="sm">
                                    Send Reference Request
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium">Actions</h4>
                                <div className="grid gap-2">
                                  <Button size="sm">
                                    Start Document Review
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-600"
                                  >
                                    Reject Application
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">Start Review</Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge variant="secondary">{worker.status}</Badge>
                    <div className="text-sm text-muted-foreground">
                      Documents: {worker.documents.uploaded}/
                      {worker.documents.total}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Under Review */}
        <TabsContent value="under-review" className="space-y-4">
          {[
            {
              id: "W002",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              role: "Support Worker",
              status: "Under Review",
              registrationDate: "2024-03-18",
              reviewStarted: "2024-03-19",
              reviewer: "Sarah Admin",
              contact: {
                email: "john.doe@example.com",
                phone: "+44 123 456 7891",
              },
              documents: {
                total: 6,
                verified: 4,
                pending: ["Reference Check", "DBS Verification"],
              },
            },
          ].map((worker) => (
            <Card key={worker.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[auto,1fr,auto] gap-6 items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={worker.avatar} />
                    <AvatarFallback>{worker.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{worker.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          #{worker.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {worker.role}
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-medium">Review started:</span>{" "}
                        {worker.reviewStarted}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Reviewer:</span>{" "}
                        {worker.reviewer}
                      </div>
                      <div className="text-sm mt-2">
                        <span className="font-medium">Pending:</span>
                        <ul className="list-disc list-inside mt-1">
                          {worker.documents.pending.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">Complete Review</Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge variant="secondary">{worker.status}</Badge>
                    <div className="text-sm text-muted-foreground">
                      Verified: {worker.documents.verified}/
                      {worker.documents.total}
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
              id: "W003",
              name: "Sarah Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              role: "Healthcare Assistant",
              status: "Approved",
              registrationDate: "2024-03-15",
              approvedDate: "2024-03-17",
              approvedBy: "Mark Supervisor",
              contact: {
                email: "sarah.johnson@example.com",
                phone: "+44 123 456 7892",
              },
              welcomeEmailSent: true,
            },
          ].map((worker) => (
            <Card key={worker.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[auto,1fr,auto] gap-6 items-start">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={worker.avatar} />
                    <AvatarFallback>{worker.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{worker.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          #{worker.id}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {worker.role}
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-medium">Approved on:</span>{" "}
                        {worker.approvedDate}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Approved by:</span>{" "}
                        {worker.approvedBy}
                      </div>
                      {worker.welcomeEmailSent && (
                        <div className="text-sm mt-2 flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-green-600" />
                          Welcome email sent
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">Assign Shifts</Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge variant="success">{worker.status}</Badge>
                    <div className="text-sm text-muted-foreground">
                      Ready to work
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
