import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Agency Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Agency Profile */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agency Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium">Agency ID: AG123456</p>
              </div>
              <div>
                <Label>Agency Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg bg-gray-200" />
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
              <div>
                <Label>Agency Name</Label>
                <Input placeholder="Enter agency name" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter agency description" />
              </div>
              <div>
                <Label>Website</Label>
                <Input placeholder="https://" />
              </div>
              <div>
                <Label>Primary Contact Person</Label>
                <Input placeholder="Enter contact person name" />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input type="email" placeholder="contact@agency.com" />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input type="tel" placeholder="+44 123 456 7890" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Worker Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mandatory DBS Check</Label>
                  <div className="text-sm text-muted-foreground">
                    Require DBS check for all workers
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Right to Work Verification</Label>
                  <div className="text-sm text-muted-foreground">
                    Verify right to work status
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Qualification Verification</Label>
                  <div className="text-sm text-muted-foreground">
                    Verify professional qualifications
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shift Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Default Shift Duration</Label>
                <Input type="number" placeholder="8" suffix="hours" />
              </div>
              <div>
                <Label>Minimum Notice Period</Label>
                <Input type="number" placeholder="24" suffix="hours" />
              </div>
              <div>
                <Label>Maximum Weekly Hours</Label>
                <Input type="number" placeholder="48" suffix="hours" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Worker Applications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications for new applications
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Shift Updates</Label>
                  <div className="text-sm text-muted-foreground">
                    Notifications about shift changes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Document Expiry</Label>
                  <div className="text-sm text-muted-foreground">
                    Alerts for expiring documents
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div>
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div>
                <Label>Confirm Password</Label>
                <Input type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable 2FA</Label>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
