import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddressAndEmergencyContact = ({ formData = {}, updateFormData }) => {
  const data = {
    address1: "",
    address2: "",
    city: "",
    county: "",
    postcode: "",
    country: "UK",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactEmail: "",
    ...formData,
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Current Address</h3>

        <div>
          <Label>Address Line 1</Label>
          <Input
            value={data.address1}
            onChange={(e) => updateFormData("address1", e.target.value)}
            placeholder="House number and street"
          />
        </div>

        <div>
          <Label>Address Line 2</Label>
          <Input
            value={data.address2}
            onChange={(e) => updateFormData("address2", e.target.value)}
            placeholder="Apartment, suite, unit, etc. (optional)"
          />
        </div>

        <div>
          <Label>City</Label>
          <Input
            value={data.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            placeholder="City"
          />
        </div>

        <div>
          <Label>County</Label>
          <Input
            value={data.county}
            onChange={(e) => updateFormData("county", e.target.value)}
            placeholder="County"
          />
        </div>

        <div>
          <Label>Postcode</Label>
          <Input
            value={data.postcode}
            onChange={(e) =>
              updateFormData("postcode", e.target.value.toUpperCase())
            }
            placeholder="Postcode"
          />
        </div>

        <div>
          <Label>Country</Label>
          <Select
            value={data.country}
            onValueChange={(value) => updateFormData("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="IE">Ireland</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Emergency Contact</h3>

        <div>
          <Label>Full Name</Label>
          <Input
            value={data.emergencyContactName}
            onChange={(e) =>
              updateFormData("emergencyContactName", e.target.value)
            }
            placeholder="Emergency contact's full name"
          />
        </div>

        <div>
          <Label>Relationship to You</Label>
          <Select
            value={data.emergencyContactRelation}
            onValueChange={(value) =>
              updateFormData("emergencyContactRelation", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spouse">Spouse/Partner</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="sibling">Sibling</SelectItem>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={data.emergencyContactPhone}
            onChange={(e) =>
              updateFormData("emergencyContactPhone", e.target.value)
            }
            placeholder="Emergency contact's phone number"
          />
        </div>

        <div>
          <Label>Email Address</Label>
          <Input
            type="email"
            value={data.emergencyContactEmail}
            onChange={(e) =>
              updateFormData("emergencyContactEmail", e.target.value)
            }
            placeholder="Emergency contact's email address"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressAndEmergencyContact;
