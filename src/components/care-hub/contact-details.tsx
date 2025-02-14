import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const Step2_ContactDetails = ({ formData, updateFormData }: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <Label>Primary Contact Name</Label>
        <Input
          value={formData.primaryContactName || ""}
          onChange={(e) => updateFormData("primaryContactName", e.target.value)}
          placeholder="Enter primary contact name"
        />
      </div>

      <div>
        <Label>Position/Role</Label>
        <Input
          value={formData.contactPosition || ""}
          onChange={(e) => updateFormData("contactPosition", e.target.value)}
          placeholder="Enter position/role"
        />
      </div>

      <div>
        <Label>Phone Number</Label>
        <Input
          type="tel"
          value={formData.phoneNumber || ""}
          onChange={(e) => updateFormData("phoneNumber", e.target.value)}
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <Label>Email Address</Label>
        <Input
          type="email"
          value={formData.emailAddress || ""}
          onChange={(e) => updateFormData("emailAddress", e.target.value)}
          placeholder="Enter email address"
        />
      </div>

      <div>
        <Label>Website (Optional)</Label>
        <Input
          value={formData.website || ""}
          onChange={(e) => updateFormData("website", e.target.value)}
          placeholder="Enter website URL"
        />
      </div>

      <div>
        <Label>Alternative Contact Name (Optional)</Label>
        <Input
          value={formData.alternativeContact || ""}
          onChange={(e) => updateFormData("alternativeContact", e.target.value)}
          placeholder="Enter alternative contact name"
        />
      </div>

      <div>
        <Label>Alternative Phone Number (Optional)</Label>
        <Input
          type="tel"
          value={formData.alternativePhone || ""}
          onChange={(e) => updateFormData("alternativePhone", e.target.value)}
          placeholder="Enter alternative phone number"
        />
      </div>
    </div>
  );
};

export default Step2_ContactDetails;
