import { Input } from "@/components/ui/input";
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

const Step1_BasicInfo = ({ formData, updateFormData }: Props) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded">
        <p className="text-sm">
          ID: <span className="font-medium">{formData.careHomeId}</span>
        </p>
      </div>

      <div>
        <Label>Care Home Name</Label>
        <Input
          value={formData.careName || ""}
          onChange={(e) => updateFormData("careName", e.target.value)}
          placeholder="Enter care home name"
        />
      </div>

      <div>
        <Label>CQC Number</Label>
        <Input
          value={formData.cqcNumber || ""}
          onChange={(e) => updateFormData("cqcNumber", e.target.value)}
          placeholder="Enter CQC registration number"
        />
      </div>

      <div>
        <Label>Business Type</Label>
        <Select
          value={formData.businessType || ""}
          onValueChange={(value) => updateFormData("businessType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select business type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="limited-company">Limited Company</SelectItem>
            <SelectItem value="partnership">Partnership</SelectItem>
            <SelectItem value="sole-trader">Sole Trader</SelectItem>
            <SelectItem value="charity">Charity/Non-profit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Establishment Date</Label>
        <Input
          type="date"
          value={formData.establishmentDate || ""}
          onChange={(e) => updateFormData("establishmentDate", e.target.value)}
        />
      </div>
    </div>
  );
};

export default Step1_BasicInfo;
