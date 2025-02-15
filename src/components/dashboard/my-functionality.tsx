import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCheck, Star, Clock, Award, Wallet } from "lucide-react";

export default function MyFunctionality() {
  const workerDetails = JSON.parse(
    localStorage.getItem("workerDetails") || "{}",
  );
  const workerProfile = {
    name: `${workerDetails.first_name || ""} ${workerDetails.last_name || ""}`,
    role: workerDetails.role || "Care Worker",
    id: "W12345",
    rating: 4.8,
    completedShifts: 45,
    hoursWorked: 540,
    earnings: "£8,100",
    qualifications: [
      { name: "NVQ Level 2", status: "Valid", expiryDate: "2025-03-20" },
      { name: "First Aid", status: "Valid", expiryDate: "2024-12-31" },
      { name: "Manual Handling", status: "Valid", expiryDate: "2024-09-15" },
      {
        name: "Medication Training",
        status: "Expiring",
        expiryDate: "2024-05-01",
      },
    ],
    recentActivity: [
      {
        action: "Shift Completed",
        details: "Night Shift at Sunrise Care Home",
        time: "2 days ago",
      },
      {
        action: "Timesheet Approved",
        details: "Day Shift at Meadow View",
        time: "4 days ago",
      },
      {
        action: "New Badge Earned",
        details: "Perfect Attendance - March",
        time: "1 week ago",
      },
    ],
    stats: {
      punctuality: 98,
      reliability: 95,
      feedback: 4.8,
    },
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Overview */}
      <div className="flex items-start gap-6">
        <div className="h-24 w-24 rounded-full bg-gray-200" />
        <div>
          <h2 className="text-2xl font-bold">{workerProfile.name}</h2>
          <p className="text-gray-600">{workerProfile.role}</p>
          <div className="mt-2 flex gap-2 text-sm text-gray-500">
            <span>ID: {workerProfile.id}</span>
            <span>•</span>
            <span>{workerProfile.completedShifts} Shifts Completed</span>
            <span>•</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              {workerProfile.rating}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Worked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workerProfile.hoursWorked}
            </div>
            <p className="text-xs text-muted-foreground">Total hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workerProfile.earnings}</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Qualifications
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workerProfile.qualifications.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Active certifications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Achievements earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="qualifications">
        <TabsList>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="qualifications" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {workerProfile.qualifications.map((qual, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{qual.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Expires: {qual.expiryDate}
                      </p>
                    </div>
                    <Badge
                      variant={qual.status === "Valid" ? "success" : "warning"}
                    >
                      {qual.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Punctuality</Label>
                  <span className="text-sm font-medium">
                    {workerProfile.stats.punctuality}%
                  </span>
                </div>
                <Progress value={workerProfile.stats.punctuality} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Reliability</Label>
                  <span className="text-sm font-medium">
                    {workerProfile.stats.reliability}%
                  </span>
                </div>
                <Progress value={workerProfile.stats.reliability} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Feedback Score</Label>
                  <span className="text-sm font-medium">
                    {workerProfile.stats.feedback}/5.0
                  </span>
                </div>
                <Progress value={(workerProfile.stats.feedback / 5) * 100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {workerProfile.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start py-4 border-b last:border-0"
                  >
                    <div>
                      <h4 className="font-medium">{activity.action}</h4>
                      <p className="text-sm text-muted-foreground">
                        {activity.details}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="text-sm font-medium">{children}</span>
);
