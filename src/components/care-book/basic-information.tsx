import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BasicInformation = ({ formData = {}, updateFormData }) => {
  const data = {
    staffId: "",
    jobRole: "",
    nmcNumber: "",
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    genderOther: "",
    niNumber: "",
    ...formData,
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded">
        <p className="text-sm">
          ID: <span className="font-medium">{data.staffId}</span>
        </p>
      </div>

      <div>
        <Label>Job Role</Label>
        <Select
          value={data.jobRole}
          onValueChange={(value) => updateFormData("jobRole", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select job role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="registered-nurse">Registered Nurse</SelectItem>
            <SelectItem value="healthcare-assistant">
              Healthcare Assistant
            </SelectItem>
            <SelectItem value="senior-carer">Senior Carer</SelectItem>
            <SelectItem value="care-assistant">Care Assistant</SelectItem>
            <SelectItem value="support-worker">Support Worker</SelectItem>
            <SelectItem value="specialist-nurse">Specialist Nurse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.jobRole === "registered-nurse" ||
      data.jobRole === "specialist-nurse" ? (
        <div>
          <Label>NMC Registration Number</Label>
          <Input
            value={data.nmcNumber}
            onChange={(e) => updateFormData("nmcNumber", e.target.value)}
            placeholder="Enter your NMC registration number"
          />
        </div>
      ) : null}

      <div>
        <Label>Title</Label>
        <Select
          value={data.title}
          onValueChange={(value) => updateFormData("title", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select title" />
          </SelectTrigger>
          <SelectContent>
            {["Mr", "Mrs", "Miss", "Ms", "Dr", "Mx"].map((title) => (
              <SelectItem key={title.toLowerCase()} value={title.toLowerCase()}>
                {title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>First Name</Label>
        <Input
          value={data.firstName}
          onChange={(e) => updateFormData("firstName", e.target.value)}
          placeholder="Enter your first name"
        />
      </div>

      <div>
        <Label>Last Name</Label>
        <Input
          value={data.lastName}
          onChange={(e) => updateFormData("lastName", e.target.value)}
          placeholder="Enter your last name"
        />
      </div>

      <div>
        <Label>Email Address</Label>
        <Input
          type="email"
          value={data.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Enter your email address"
        />
      </div>

      <div>
        <Label>Phone Number</Label>
        <Input
          type="tel"
          value={data.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <Label>Date of Birth</Label>
        <Input
          type="date"
          value={data.dateOfBirth}
          onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
        />
      </div>

      <div>
        <Label>Sex/Gender</Label>
        <Select
          value={data.gender}
          onValueChange={(value) => updateFormData("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            <SelectItem value="self-describe">
              Prefer to self-describe
            </SelectItem>
          </SelectContent>
        </Select>
        {data.gender === "self-describe" && (
          <Input
            type="text"
            value={data.genderOther}
            onChange={(e) => updateFormData("genderOther", e.target.value)}
            placeholder="Please describe"
            className="mt-2"
          />
        )}
      </div>

      <div>
        <Label>National Insurance Number</Label>
        <Input
          value={data.niNumber}
          onChange={(e) =>
            updateFormData("niNumber", e.target.value.toUpperCase())
          }
          placeholder="Enter your NI number"
        />
      </div>
    </div>
  );
};

export default BasicInformation;
