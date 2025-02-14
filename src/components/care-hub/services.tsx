import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const Step4_Services = ({ formData, updateFormData }: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <Label>Types of Care Provided</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            { id: "residential", label: "Residential Care" },
            { id: "nursing", label: "Nursing Care" },
            { id: "dementia", label: "Dementia Care" },
            { id: "palliative", label: "Palliative Care" },
            { id: "respite", label: "Respite Care" },
            { id: "learning-disabilities", label: "Learning Disabilities" },
          ].map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={type.id}
                checked={(formData.careTypes || []).includes(type.id)}
                onCheckedChange={(checked) => {
                  const currentTypes = formData.careTypes || [];
                  const newTypes = checked
                    ? [...currentTypes, type.id]
                    : currentTypes.filter((t: string) => t !== type.id);
                  updateFormData("careTypes", newTypes);
                }}
              />
              <label htmlFor={type.id} className="text-sm font-medium">
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Specializations</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            { id: "elderly", label: "Elderly Care" },
            { id: "mental-health", label: "Mental Health" },
            { id: "physical-disabilities", label: "Physical Disabilities" },
            { id: "brain-injury", label: "Brain Injury" },
            { id: "young-adults", label: "Young Adults" },
            { id: "alcohol-drugs", label: "Alcohol/Drug Recovery" },
          ].map((spec) => (
            <div key={spec.id} className="flex items-center space-x-2">
              <Checkbox
                id={spec.id}
                checked={(formData.specializations || []).includes(spec.id)}
                onCheckedChange={(checked) => {
                  const currentSpecs = formData.specializations || [];
                  const newSpecs = checked
                    ? [...currentSpecs, spec.id]
                    : currentSpecs.filter((s: string) => s !== spec.id);
                  updateFormData("specializations", newSpecs);
                }}
              />
              <label htmlFor={spec.id} className="text-sm font-medium">
                {spec.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Minimum Staff Qualification Required</Label>
        <Select
          value={formData.minStaffQualification || ""}
          onValueChange={(value) =>
            updateFormData("minStaffQualification", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select minimum qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Formal Qualification</SelectItem>
            <SelectItem value="nvq2">NVQ Level 2</SelectItem>
            <SelectItem value="nvq3">NVQ Level 3</SelectItem>
            <SelectItem value="nvq4">NVQ Level 4</SelectItem>
            <SelectItem value="nursing">Nursing Qualification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Preferred Shift Patterns</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {[
            { id: "early", label: "Early (e.g., 7am-2pm)" },
            { id: "late", label: "Late (e.g., 2pm-9pm)" },
            { id: "long-day", label: "Long Day (e.g., 7am-9pm)" },
            { id: "night", label: "Night (e.g., 9pm-7am)" },
            { id: "short", label: "Short Shifts (4-6 hours)" },
            { id: "custom", label: "Custom Patterns" },
          ].map((pattern) => (
            <div key={pattern.id} className="flex items-center space-x-2">
              <Checkbox
                id={pattern.id}
                checked={(formData.shiftPatterns || []).includes(pattern.id)}
                onCheckedChange={(checked) => {
                  const currentPatterns = formData.shiftPatterns || [];
                  const newPatterns = checked
                    ? [...currentPatterns, pattern.id]
                    : currentPatterns.filter((p: string) => p !== pattern.id);
                  updateFormData("shiftPatterns", newPatterns);
                }}
              />
              <label htmlFor={pattern.id} className="text-sm font-medium">
                {pattern.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step4_Services;
