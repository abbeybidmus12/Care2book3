import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/session";
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
  const { careHub } = useSession();

  const [formData, setFormData] = useState({
    role: "",
    shiftType: "",
    careHub: careHub?.care_home_name || "",
    date: "",
    breakDuration: "",
    startTime: "",
    endTime: "",
    qualifications: [],
    experience: "",
    hourlyRate: "",
    shiftBonus: "0",
    preferredWorkerOnly: false,
    uniformRequired: false,
    specialInstructions: "",
    emergencyContact: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleQualificationChange = (qualId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: checked
        ? [...prev.qualifications, qualId]
        : prev.qualifications.filter((q) => q !== qualId),
    }));
  };

  const initialFormState = {
    role: "",
    shiftType: "",
    careHub: careHub?.care_home_name || "",
    date: "",
    breakDuration: "",
    startTime: "",
    endTime: "",
    qualifications: [],
    experience: "",
    hourlyRate: "",
    shiftBonus: "0",
    preferredWorkerOnly: false,
    uniformRequired: false,
    specialInstructions: "",
    emergencyContact: "",
  };

  const handlePostShift = async () => {
    try {
      // First get the care hub address details
      const { data: careHubData, error: careHubError } = await supabase
        .from("carehub_reg")
        .select("*")
        .eq("care_home_name", formData.careHub)
        .single();

      if (careHubError) throw careHubError;

      // Then create the shift with the address details
      // Generate a shift ID with format SH + YYYYMMDDHHMMSS
      const shiftId = `SH${new Date()
        .toISOString()
        .replace(/[-:T.]/g, "")
        .slice(0, 14)}`;

      const { error } = await supabase.from("shifts").insert([
        {
          shift_id: shiftId,
          role: formData.role,
          care_hub: formData.careHub,
          date: formData.date,
          start_time: formData.startTime + ":00",
          end_time: formData.endTime + ":00",
          break_duration: parseInt(formData.breakDuration || "0"),
          shift_type: formData.shiftType,
          hourly_rate: parseFloat(formData.hourlyRate || "0"),
          shift_bonus: parseFloat(formData.shiftBonus || "0"),
          preferred_worker_only: formData.preferredWorkerOnly || false,
          uniform_required: formData.uniformRequired || false,
          special_instructions: formData.specialInstructions || null,
          emergency_contact: formData.emergencyContact || null,
          qualifications: formData.qualifications || [],
          experience: formData.experience || null,
          status: "Open",
          address_line1: careHubData.address_line1,
          address_line2: careHubData.address_line2,
          city: careHubData.city,
          county: careHubData.county,
          postcode: careHubData.postcode,
        },
      ]);

      if (error) throw error;

      setFormData(initialFormState);
      // Fill addresses after posting shift
      await fillShiftAddresses();
      alert("Shift posted successfully!");
    } catch (error) {
      console.error("Error posting shift:", error);
      alert("Error posting shift");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Basic Shift Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Basic Shift Information</h3>

            <div>
              <Label>Required Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => handleInputChange("role", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select required role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Healthcare Assistant">
                    Healthcare Assistant
                  </SelectItem>
                  <SelectItem value="Support Worker">Support Worker</SelectItem>
                  <SelectItem value="Registered Nurse">
                    Registered Nurse
                  </SelectItem>
                  <SelectItem value="Senior Carer">Senior Carer</SelectItem>
                  <SelectItem value="Specialist Nurse">
                    Specialist Nurse
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Shift Type</Label>
              <Select
                value={formData.shiftType}
                onValueChange={(value) => handleInputChange("shiftType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shift type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day Shift (7am-7pm)</SelectItem>
                  <SelectItem value="night">Night Shift (7pm-7am)</SelectItem>
                  <SelectItem value="early">Early Shift (7am-3pm)</SelectItem>
                  <SelectItem value="late">Late Shift (2pm-10pm)</SelectItem>
                  <SelectItem value="long-day">Long Day (7am-9pm)</SelectItem>
                  <SelectItem value="short">Short Shift (4-6 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Care Hub Name</Label>
              <Input value={formData.careHub} disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Shift Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>
              <div>
                <Label>Break Duration (minutes)</Label>
                <Input
                  type="number"
                  placeholder="60"
                  value={formData.breakDuration}
                  onChange={(e) =>
                    handleInputChange("breakDuration", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Start Time</Label>
                <Input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>End Time</Label>
                <Input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
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
                    <Checkbox
                      id={qual.id}
                      checked={formData.qualifications.includes(qual.id)}
                      onCheckedChange={(checked) =>
                        handleQualificationChange(qual.id, checked as boolean)
                      }
                    />
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
              <Select
                value={formData.experience}
                onValueChange={(value) =>
                  handleInputChange("experience", value)
                }
              >
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
                <Input
                  type="number"
                  placeholder="15.00"
                  step="0.50"
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    handleInputChange("hourlyRate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Shift Bonus (£)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.50"
                  value={formData.shiftBonus}
                  onChange={(e) =>
                    handleInputChange("shiftBonus", e.target.value)
                  }
                />
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
              <Switch
                checked={formData.preferredWorkerOnly}
                onCheckedChange={(checked) =>
                  handleInputChange("preferredWorkerOnly", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Uniform Required</Label>
                <div className="text-sm text-muted-foreground">
                  Worker must wear their own uniform
                </div>
              </div>
              <Switch
                checked={formData.uniformRequired}
                onCheckedChange={(checked) =>
                  handleInputChange("uniformRequired", checked)
                }
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Additional Details</h3>

            <div>
              <Label>Special Instructions</Label>
              <Textarea
                placeholder="Enter any special instructions, uniform requirements, parking details, etc."
                value={formData.specialInstructions}
                onChange={(e) =>
                  handleInputChange("specialInstructions", e.target.value)
                }
              />
            </div>

            <div>
              <Label>Emergency Contact Information</Label>
              <Textarea
                placeholder="Enter emergency contact details for urgent inquiries"
                value={formData.emergencyContact}
                onChange={(e) =>
                  handleInputChange("emergencyContact", e.target.value)
                }
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save as Draft</Button>
            <Button onClick={handlePostShift}>Post Shift Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
