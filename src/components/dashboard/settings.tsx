import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Profile Picture</Label>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-200" />
              <Button variant="outline">Change Photo</Button>
            </div>
          </div>
          <div>
            <Label>Full Name</Label>
            <Input placeholder="Enter your full name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label>Phone</Label>
            <Input type="tel" placeholder="Enter your phone number" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications via email
              </div>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications via SMS
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
