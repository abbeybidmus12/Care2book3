import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [shiftTypes, setShiftTypes] = useState([
    { id: "1", name: "Day Shift", startTime: "07:00", endTime: "19:00" },
    { id: "2", name: "Night Shift", startTime: "19:00", endTime: "07:00" },
    { id: "3", name: "Early", startTime: "07:00", endTime: "15:00" },
    { id: "4", name: "Late", startTime: "14:00", endTime: "22:00" },
  ]);

  const addShiftType = () => {
    setShiftTypes([...shiftTypes, { 
      id: String(shiftTypes.length + 1), 
      name: "New Shift", 
      startTime: "09:00", 
      endTime: "17:00" 
    }]);
  };

  const removeShiftType = (id: string) => {
    setShiftTypes(shiftTypes.filter(shift => shift.id !== id));
  };

  const updateShiftType = (id: string, field: string, value: string) => {
    setShiftTypes(shiftTypes.map(shift => 
      shift.id === id ? { ...shift, [field]: value } : shift
    ));
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="shifts">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="shifts">Shift Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Shift Settings */}
        <TabsContent value="shifts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shift Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {shiftTypes.map((shift) => (
                <div key={shift.id} className="flex items-end gap-4">
                  <div className="flex-1">
                    <Label>Shift Name</Label>
                    <Input
                      value={shift.name}
                      onChange={(e) => updateShiftType(shift.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Start Time</Label>
                    <Input
                      type="time"
                      value={shift.startTime}
                      onChange={(e) => updateShiftType(shift.id, "startTime", e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label>End Time</Label>
                    <Input
                      type="time"
                      value={shift.endTime}
                      onChange={(e) => updateShiftType(shift.id, "endTime", e.target.value)}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeShiftType(shift.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addShiftType} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Shift Type
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default Break Times</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Short Shift Break (≤6 hours)</Label>
                  <Input type="number" placeholder="15" suffix="minutes" />
                </div>
                <div>
                  <Label>Long Shift Break (>6 hours)</Label>
                  <Input type="number" placeholder="30" suffix="minutes" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Shift Alerts</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications about shift changes
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Care Hub Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium">Care Hub ID: CH123456</p>
              </div>
              <div>
                <Label>Care Hub Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  <div className="h-20 w-20 rounded-lg bg-gray-200" />
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter a description of your care hub" />
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
                <Input type="email" placeholder="contact@carehub.com" />
              </div>
              <div>
                <Label>Contact Phone</Label>
                <Input type="tel" placeholder="+44 123 456 7890" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
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
