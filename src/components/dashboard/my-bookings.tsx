import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  ExternalLink,
  Clock,
  Building2,
  Download,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MyBookings() {
  const bookings = {
    pending: [
      {
        id: "BK125",
        title: "Support Worker - Day Shift",
        careHub: "Sunrise Care Home",
        date: "Thursday, March 7, 2024",
        time: "7:00 AM - 7:00 PM",
        rate: "£15/hr",
        address: {
          line1: "123 Sunrise Way",
          line2: "Meadowbrook Estate",
          city: "Manchester",
          postcode: "M1 2AB",
        },
        mapUrl: "https://maps.google.com/?q=123+Sunrise+Way+Manchester+M1+2AB",
        status: "Pending Approval",
        submittedAt: "2024-03-01 09:00",
      },
    ],
    upcoming: [
      {
        id: "BK123",
        title: "Support Worker - Night Shift",
        careHub: "Sunrise Care Home",
        date: "Tuesday, March 5, 2024",
        time: "8:00 PM - 8:00 AM",
        rate: "£15/hr",
        address: {
          line1: "123 Sunrise Way",
          line2: "Meadowbrook Estate",
          city: "Manchester",
          postcode: "M1 2AB",
        },
        mapUrl: "https://maps.google.com/?q=123+Sunrise+Way+Manchester+M1+2AB",
        status: "Confirmed",
        canCancel: true,
      },
      {
        id: "BK124",
        title: "Healthcare Assistant - Day Shift",
        careHub: "Meadow View Care",
        date: "Wednesday, March 6, 2024",
        time: "7:00 AM - 7:00 PM",
        rate: "£14/hr",
        address: {
          line1: "45 Meadow Lane",
          line2: "Care Village",
          city: "Liverpool",
          postcode: "L3 5XY",
        },
        mapUrl: "https://maps.google.com/?q=45+Meadow+Lane+Liverpool+L3+5XY",
        status: "Pending Cancellation",
        canCancel: false,
      },
    ],
    past: [
      {
        id: "BK120",
        title: "Support Worker - Day Shift",
        careHub: "Sunrise Care Home",
        date: "Monday, March 1, 2024",
        time: "7:00 AM - 7:00 PM",
        rate: "£15/hr",
        totalHours: 12,
        totalEarnings: "£180",
        rating: 5,
        timesheetStatus: "Approved",
        address: {
          line1: "123 Sunrise Way",
          city: "Manchester",
          postcode: "M1 2AB",
        },
        feedback: "Excellent work ethic and patient care",
      },
    ],
    canceled: [
      {
        id: "BK119",
        title: "Healthcare Assistant - Night Shift",
        careHub: "Meadow View Care",
        date: "Sunday, February 28, 2024",
        time: "8:00 PM - 8:00 AM",
        canceledBy: "Self",
        reason: "Personal emergency",
        policyImpact: "Late Cancellation Warning",
      },
    ],
  };

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
              <Label>Care Hub</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Care Hub" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Care Hubs</SelectItem>
                  <SelectItem value="sunrise">Sunrise Care Home</SelectItem>
                  <SelectItem value="meadow">Meadow View Care</SelectItem>
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
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending Cancellation</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Sort By</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="earnings">Highest Paid</SelectItem>
                  <SelectItem value="date">Closest Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending Shifts</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Shifts</TabsTrigger>
          <TabsTrigger value="past">Past Shifts</TabsTrigger>
          <TabsTrigger value="canceled">Canceled Shifts</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-4">
          {bookings.pending.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {booking.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{booking.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{booking.careHub}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {booking.address.line1},
                        {booking.address.line2 && ` ${booking.address.line2},`}
                        {` ${booking.address.city}, ${booking.address.postcode}`}
                      </span>
                      <a
                        href={booking.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel Application
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 text-right">
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <div className="text-sm">
                          <div>{booking.date}</div>
                          <div>{booking.time}</div>
                        </div>
                      </div>
                    </div>

                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      {booking.status}
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Submitted: {booking.submittedAt}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {bookings.upcoming.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {booking.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{booking.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{booking.careHub}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {booking.address.line1},
                        {booking.address.line2 && ` ${booking.address.line2},`}
                        {` ${booking.address.city}, ${booking.address.postcode}`}
                      </span>
                      <a
                        href={booking.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {booking.canCancel && (
                        <Button variant="destructive" size="sm">
                          Cancel Shift
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Contact Care Hub
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 text-right">
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <div className="text-sm">
                          <div>{booking.date}</div>
                          <div>{booking.time}</div>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-4">
          {bookings.past.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {booking.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{booking.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{booking.careHub}</span>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <div>Total Hours: {booking.totalHours}</div>
                      <div>Earnings: {booking.totalEarnings}</div>
                      <div>Rating: {"★".repeat(booking.rating)}</div>
                      {booking.feedback && (
                        <div className="mt-2">
                          <span className="font-medium">Feedback:</span>{" "}
                          {booking.feedback}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Timesheet
                      </Button>
                      <Button variant="outline" size="sm">
                        Rate Shift
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 text-right">
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <div className="text-sm">
                          <div>{booking.date}</div>
                          <div>{booking.time}</div>
                        </div>
                      </div>
                    </div>

                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Timesheet {booking.timesheetStatus}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="canceled" className="space-y-4 mt-4">
          {bookings.canceled.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                          {booking.title}
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          #{booking.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        <span>{booking.careHub}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <div>
                        <div>Canceled by: {booking.canceledBy}</div>
                        <div>Reason: {booking.reason}</div>
                      </div>
                    </div>

                    {booking.policyImpact && (
                      <div className="text-sm text-red-600">
                        Policy Impact: {booking.policyImpact}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 text-right">
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <div className="text-sm">
                          <div>{booking.date}</div>
                          <div>{booking.time}</div>
                        </div>
                      </div>
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
