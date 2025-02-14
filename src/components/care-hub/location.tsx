import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const Step3_Location = ({ formData, updateFormData }: Props) => {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Location</h3>

        <div>
          <Label>Postcode</Label>
          <div className="flex gap-2">
            <Input
              value={formData.postcode || ""}
              onChange={(e) => updateFormData("postcode", e.target.value)}
              placeholder="Enter postcode"
            />
            <Button>Search</Button>
          </div>
        </div>

        <div>
          <Label>Address Line 1</Label>
          <Input
            value={formData.addressLine1 || ""}
            onChange={(e) => updateFormData("addressLine1", e.target.value)}
            placeholder="Enter address line 1"
          />
        </div>

        <div>
          <Label>Address Line 2 (Optional)</Label>
          <Input
            value={formData.addressLine2 || ""}
            onChange={(e) => updateFormData("addressLine2", e.target.value)}
            placeholder="Enter address line 2"
          />
        </div>

        <div>
          <Label>Town/City</Label>
          <Input
            value={formData.city || ""}
            onChange={(e) => updateFormData("city", e.target.value)}
            placeholder="Enter town/city"
          />
        </div>

        <div>
          <Label>County</Label>
          <Input
            value={formData.county || ""}
            onChange={(e) => updateFormData("county", e.target.value)}
            placeholder="Enter county"
          />
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-medium">Capacity</h3>

        <div>
          <Label>Total Number of Beds</Label>
          <Input
            type="number"
            value={formData.totalBeds || ""}
            onChange={(e) => updateFormData("totalBeds", e.target.value)}
            min="0"
          />
        </div>

        <div>
          <Label>Number of Nursing Beds</Label>
          <Input
            type="number"
            value={formData.nursingBeds || ""}
            onChange={(e) => updateFormData("nursingBeds", e.target.value)}
            min="0"
          />
        </div>

        <div>
          <Label>Number of Residential Beds</Label>
          <Input
            type="number"
            value={formData.residentialBeds || ""}
            onChange={(e) => updateFormData("residentialBeds", e.target.value)}
            min="0"
          />
        </div>

        <div>
          <Label>Number of Specialist Care Beds (if applicable)</Label>
          <Input
            type="number"
            value={formData.specialistBeds || ""}
            onChange={(e) => updateFormData("specialistBeds", e.target.value)}
            min="0"
          />
        </div>
      </div>
    </div>
  );
};

export default Step3_Location;
