import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PostShifts() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Basic Shift Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Shift Information</h3>

            <div>
              <Label>Required Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select required role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare-assistant">
                    Healthcare Assistant
                  </SelectItem>
                  <SelectItem value="support-worker">Support Worker</SelectItem>
                  <SelectItem value="registered-nurse">
                    Registered Nurse
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Shift Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day Shift (7am-7pm)</SelectItem>
                  <SelectItem value="night">Night Shift (7pm-7am)</SelectItem>
                  <SelectItem value="early">Early Shift (7am-3pm)</SelectItem>
                  <SelectItem value="late">Late Shift (2pm-10pm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Care Hub Name</Label>
              <Input value="Sunrise Care Home" disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Shift Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>Break Duration (minutes)</Label>
                <Input type="number" placeholder="60" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <Input type="time" />
              </div>
              <div>
                <Label>End Time</Label>
                <Input type="time" />
              </div>
            </div>
          </div>

          {/* Worker Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Worker Requirements</h3>

            <div className="space-y-2">
              <Label>Required Qualifications</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "nvq2", label: "NVQ Level 2" },
                  { id: "nvq3", label: "NVQ Level 3" },
                  { id: "pmva", label: "PMVA" },
                  { id: "manual-handling", label: "Manual Handling" },
                  { id: "first-aid", label: "First Aid" },
                  { id: "medication", label: "Medication Trained" },
                ].map((qual) => (
                  <div
                    key={qual.id}
                    className="flex items-center space-x-2 p-2 border rounded hover:bg-accent cursor-pointer"
                  >
                    <Checkbox id={qual.id} />
                    <label
                      htmlFor={qual.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {qual.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>Experience Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No experience required</SelectItem>
                  <SelectItem value="1year">1+ years</SelectItem>
                  <SelectItem value="3years">3+ years</SelectItem>
                  <SelectItem value="5years">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment & Rates */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment & Rates</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Hourly Rate (£)</Label>
                <Input type="number" placeholder="15.00" step="0.50" />
              </div>
              <div>
                <Label>Shift Bonus (£)</Label>
                <Input type="number" placeholder="0.00" step="0.50" />
              </div>
            </div>
          </div>

          {/* Shift Preferences & Access */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shift Preferences & Access</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Preferred Worker Only</Label>
                <div className="text-sm text-muted-foreground">
                  Limit shift visibility to favorite workers
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Uniform Required</Label>
                <div className="text-sm text-muted-foreground">
                  Worker must wear their own uniform
                </div>
              </div>
              <Switch />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Details</h3>

            <div>
              <Label>Special Instructions</Label>
              <Textarea placeholder="Enter any special instructions, uniform requirements, parking details, etc." />
            </div>

            <div>
              <Label>Emergency Contact Information</Label>
              <Textarea placeholder="Enter emergency contact details for urgent inquiries" />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save as Draft</Button>
            <Button>Post Shift Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
