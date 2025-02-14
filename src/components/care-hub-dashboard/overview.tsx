import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, Users, AlertTriangle } from "lucide-react";

export default function CareHubOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Facility Summary */}
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 rounded-lg bg-gray-200" />
        <div>
          <h2 className="text-2xl font-bold">Sunrise Care Home</h2>
          <p className="text-gray-600">CQC Number: 1234567890</p>
          <div className="mt-2 flex gap-2 text-sm text-gray-500">
            <span>50 Beds</span>
            <span>•</span>
            <span>Nursing & Residential Care</span>
            <span>•</span>
            <span>Established 2010</span>
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 need coverage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Upcoming shifts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timesheets</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Active this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
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
                action: "Shift Filled",
                details: "Night Shift (Mar 15) - John Doe accepted",
                time: "2 hours ago",
              },
              {
                action: "Timesheet Submitted",
                details: "Sarah Smith - Day Shift (Mar 14)",
                time: "5 hours ago",
              },
              {
                action: "New Incident Report",
                details: "Minor incident reported by James Wilson",
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
                message: "3 shifts tomorrow still need coverage",
                action: "View Shifts",
              },
              {
                type: "info",
                message: "5 timesheets pending approval from last week",
                action: "Review",
              },
              {
                type: "alert",
                message: "Updated CQC guidelines available",
                action: "Read More",
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
