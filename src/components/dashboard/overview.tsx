import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Wallet, Bell } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Profile Summary */}
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 rounded-full bg-gray-200" />
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-600">Registered Nurse</p>
          <div className="mt-2 flex gap-2 text-sm text-gray-500">
            <span>NMC: 12345678</span>
            <span>•</span>
            <span>DBS: Valid</span>
            <span>•</span>
            <span>5 Years Experience</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Shifts
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Next shift in 2 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hours This Month
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£1,250</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 require action</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Shifts */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "Mon, 15 Apr",
                time: "07:00 - 19:00",
                location: "Sunrise Care Home",
                role: "Registered Nurse",
                status: "Confirmed",
              },
              {
                date: "Wed, 17 Apr",
                time: "08:00 - 20:00",
                location: "Meadow View Care",
                role: "Registered Nurse",
                status: "Pending",
              },
            ].map((shift, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <p className="font-medium">{shift.location}</p>
                  <p className="text-sm text-gray-500">{shift.role}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-medium">{shift.date}</p>
                  <p className="text-sm text-gray-500">{shift.time}</p>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${shift.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {shift.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Timesheet Approved",
                details: "Week ending 7th April",
                time: "2 hours ago",
              },
              {
                action: "Shift Booked",
                details: "Sunrise Care Home - Mon, 15 Apr",
                time: "5 hours ago",
              },
              {
                action: "Payment Received",
                details: "£625 - March Week 4",
                time: "1 day ago",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
