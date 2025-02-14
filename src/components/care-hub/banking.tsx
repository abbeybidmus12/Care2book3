import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const Step5_Banking = ({ formData, updateFormData }: Props) => {
  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 p-4 rounded">
        <h3 className="font-medium mb-2">Bank Details Information</h3>
        <p className="text-sm text-gray-600">
          Bank details are required for processing payments to the agency for
          care worker shifts. You can choose to provide these details now or
          later during the contract setup phase.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="setupBank"
          checked={formData.setupBankDetails || false}
          onCheckedChange={(checked) =>
            updateFormData("setupBankDetails", checked)
          }
        />
        <Label htmlFor="setupBank">I want to set up bank details now</Label>
      </div>

      {formData.setupBankDetails && (
        <div className="space-y-4">
          <div>
            <Label>Account Name</Label>
            <Input
              value={formData.accountName || ""}
              onChange={(e) => updateFormData("accountName", e.target.value)}
              placeholder="Enter account name"
            />
          </div>

          <div>
            <Label>Sort Code</Label>
            <Input
              value={formData.sortCode || ""}
              onChange={(e) => updateFormData("sortCode", e.target.value)}
              placeholder="XX-XX-XX"
              maxLength={8}
            />
          </div>

          <div>
            <Label>Account Number</Label>
            <Input
              value={formData.accountNumber || ""}
              onChange={(e) => updateFormData("accountNumber", e.target.value)}
              placeholder="Enter 8-digit account number"
              maxLength={8}
            />
          </div>

          <div className="text-sm text-gray-500 mt-2">
            <p>
              Note: Payment terms and schedules will be discussed during the
              contract setup phase.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5_Banking;
