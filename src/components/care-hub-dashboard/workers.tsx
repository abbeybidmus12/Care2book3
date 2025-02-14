import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, Clock, FileCheck, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
              <Label>Last Shift</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workers List */}
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        {/* Active Workers */}
        <TabsContent value="active" className="space-y-4">
          {[
            {
              id: "W001",
              name: "Jane Smith",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
              role: "Healthcare Assistant",
              status: "Active",
              lastShift: "2024-03-20",
              totalShifts: 45,
              rating: 4.8,
              contact: {
                email: "jane.smith@example.com",
                phone: "+44 123 456 7890",
              },
              availability: "Available",
              compliance: {
                status: "Valid",
                expiryDate: "2024-12-31",
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
                        <Star className="h-4 w-4 text-yellow-500" />
                        {worker.rating}/5.0
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {worker.totalShifts} shifts completed
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Last shift: {worker.lastShift}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Worker Profile</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
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

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label>Email</Label>
                                <div>{worker.contact.email}</div>
                              </div>
                              <div>
                                <Label>Phone</Label>
                                <div>{worker.contact.phone}</div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label>Compliance Status</Label>
                              <div className="flex items-center gap-2">
                                <FileCheck className="h-4 w-4 text-green-500" />
                                <span className="text-sm">
                                  All documents valid until{" "}
                                  {worker.compliance.expiryDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm">Assign Shift</Button>
                      <Button variant="destructive" size="sm">
                        Suspend
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge
                      variant={
                        worker.availability === "Available"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {worker.availability}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      ID: {worker.id}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Suspended Workers */}
        <TabsContent value="suspended" className="space-y-4">
          {[
            {
              id: "W002",
              name: "John Doe",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
              role: "Support Worker",
              status: "Suspended",
              lastShift: "2024-03-15",
              totalShifts: 32,
              rating: 4.2,
              suspensionReason: "Compliance documents expired",
              suspendedOn: "2024-03-16",
              contact: {
                email: "john.doe@example.com",
                phone: "+44 123 456 7891",
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

                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-4 w-4" />
                      {worker.suspensionReason}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">Reactivate</Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge variant="destructive">Suspended</Badge>
                    <div className="text-sm text-muted-foreground">
                      Suspended on: {worker.suspendedOn}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Inactive Workers */}
        <TabsContent value="inactive" className="space-y-4">
          {[
            {
              id: "W003",
              name: "Sarah Johnson",
              avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
              role: "Healthcare Assistant",
              status: "Inactive",
              lastShift: "2024-02-15",
              totalShifts: 15,
              rating: 4.5,
              inactiveReason: "No shifts in last 30 days",
              lastActive: "2024-02-15",
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

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {worker.inactiveReason}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="destructive" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <Badge variant="secondary">Inactive</Badge>
                    <div className="text-sm text-muted-foreground">
                      Last active: {worker.lastActive}
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
