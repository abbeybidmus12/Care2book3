import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users, AlertTriangle, Wallet } from "lucide-react";

export default function DashboardOverview() {
  const workerDetails = JSON.parse(
    localStorage.getItem("workerDetails") || "{}",
  );

  return (
    <div className="p-6 space-y-6">
      {/* Worker Summary */}
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 rounded-lg bg-gray-200" />
        <div>
          <h2 className="text-2xl font-bold">
            {workerDetails.first_name || ""} {workerDetails.last_name || ""}
          </h2>
          <p className="text-gray-600">{workerDetails.role || "Care Worker"}</p>
          <div className="mt-2 flex gap-2 text-sm text-gray-500">
            <span>ID: {workerDetails.worker_id || "N/A"}</span>
            <span>•</span>
            <span>45 Shifts Completed</span>
            <span>•</span>
            <span>4.8/5 Rating</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shifts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Booked shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£630</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Document expiring</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "Shift Booked",
                details: "Night Shift at Sunrise Care Home",
                time: "2 hours ago",
              },
              {
                action: "Timesheet Submitted",
                details: "Day Shift at Meadow View Care",
                time: "5 hours ago",
              },
              {
                action: "Payment Received",
                details: "£180 for last week's shifts",
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

      {/* Notifications Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "warning",
                message: "Your DBS check expires in 30 days",
                action: "Renew Now",
              },
              {
                type: "info",
                message: "New shifts available at Sunrise Care Home",
                action: "View Shifts",
              },
              {
                type: "alert",
                message: "Please complete your timesheet for last week",
                action: "Submit",
              },
            ].map((notification, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg ${notification.type === "warning" ? "bg-yellow-50 text-yellow-800" : notification.type === "alert" ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}
              >
                <div className="flex justify-between items-center">
                  <span>{notification.message}</span>
                  <button className="text-sm font-medium hover:underline">
                    {notification.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
