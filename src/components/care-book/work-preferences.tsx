import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const WorkPreferences = ({ formData = {}, updateFormData }) => {
  const data = {
    availabilityType: "",
    preferredShifts: [],
    preferredLocations: "",
    minHoursPerWeek: "",
    maxHoursPerWeek: "",
    transportMethod: "",
    startDate: "",
    additionalNotes: "",
    ...formData,
  };

  const shiftTypes = [
    { id: "early", label: "Early (e.g., 7am-3pm)" },
    { id: "late", label: "Late (e.g., 2pm-10pm)" },
    { id: "night", label: "Night (e.g., 9pm-7am)" },
    { id: "longday", label: "Long Day (e.g., 7am-9pm)" },
  ];

  const handleShiftToggle = (shiftId) => {
    const currentShifts = data.preferredShifts || [];
    const updatedShifts = currentShifts.includes(shiftId)
      ? currentShifts.filter((id) => id !== shiftId)
      : [...currentShifts, shiftId];
    updateFormData("preferredShifts", updatedShifts);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Availability</h3>
        <div>
          <Label>Type of Work</Label>
          <RadioGroup
            value={data.availabilityType}
            onValueChange={(value) => updateFormData("availabilityType", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full-time" id="full-time" />
              <Label htmlFor="full-time">Full Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="part-time" id="part-time" />
              <Label htmlFor="part-time">Part Time</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">Bank/Agency</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Preferred Shifts</Label>
          {shiftTypes.map((shift) => (
            <div key={shift.id} className="flex items-center space-x-2">
              <Checkbox
                id={shift.id}
                checked={(data.preferredShifts || []).includes(shift.id)}
                onCheckedChange={() => handleShiftToggle(shift.id)}
              />
              <Label htmlFor={shift.id}>{shift.label}</Label>
            </div>
          ))}
        </div>

        <div>
          <Label>Preferred Locations</Label>
          <Textarea
            value={data.preferredLocations}
            onChange={(e) =>
              updateFormData("preferredLocations", e.target.value)
            }
            placeholder="List areas or specific facilities you prefer to work in"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hours & Availability</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Minimum Hours per Week</Label>
            <Input
              type="number"
              min="0"
              max="168"
              value={data.minHoursPerWeek}
              onChange={(e) =>
                updateFormData("minHoursPerWeek", e.target.value)
              }
              placeholder="Min hours"
            />
          </div>
          <div>
            <Label>Maximum Hours per Week</Label>
            <Input
              type="number"
              min="0"
              max="168"
              value={data.maxHoursPerWeek}
              onChange={(e) =>
                updateFormData("maxHoursPerWeek", e.target.value)
              }
              placeholder="Max hours"
            />
          </div>
        </div>

        <div>
          <Label>Transport Method</Label>
          <RadioGroup
            value={data.transportMethod}
            onValueChange={(value) => updateFormData("transportMethod", value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="own-car" id="own-car" />
              <Label htmlFor="own-car">Own Car</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public">Public Transport</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Both</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Earliest Start Date</Label>
          <Input
            type="date"
            value={data.startDate}
            onChange={(e) => updateFormData("startDate", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Additional Information</h3>
        <div>
          <Label>Additional Notes</Label>
          <Textarea
            value={data.additionalNotes}
            onChange={(e) => updateFormData("additionalNotes", e.target.value)}
            placeholder="Any other information about your work preferences or availability"
            className="h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkPreferences;
