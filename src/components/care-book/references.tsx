import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const References = ({ formData = {}, updateFormData }) => {
  const data = {
    references: formData.references || [
      {
        name: "",
        jobTitle: "",
        organization: "",
        email: "",
        phone: "",
        relationship: "",
        yearsKnown: "",
      },
      {
        name: "",
        jobTitle: "",
        organization: "",
        email: "",
        phone: "",
        relationship: "",
        yearsKnown: "",
      },
    ],
  };

  const updateReference = (index, field, value) => {
    const newReferences = [...data.references];
    newReferences[index] = {
      ...newReferences[index],
      [field]: value,
    };
    updateFormData("references", newReferences);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Professional References</h3>
        <p className="text-sm text-muted-foreground">
          Please provide details of two professional references who can vouch
          for your work experience and character. At least one should be from a
          recent employer.
        </p>
      </div>

      {data.references.map((ref, index) => (
        <div key={index} className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Reference {index + 1}</h4>

          <div>
            <Label>Full Name</Label>
            <Input
              value={ref.name}
              onChange={(e) => updateReference(index, "name", e.target.value)}
              placeholder="Reference's full name"
            />
          </div>

          <div>
            <Label>Job Title</Label>
            <Input
              value={ref.jobTitle}
              onChange={(e) =>
                updateReference(index, "jobTitle", e.target.value)
              }
              placeholder="Reference's job title"
            />
          </div>

          <div>
            <Label>Organization</Label>
            <Input
              value={ref.organization}
              onChange={(e) =>
                updateReference(index, "organization", e.target.value)
              }
              placeholder="Organization name"
            />
          </div>

          <div>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={ref.email}
              onChange={(e) => updateReference(index, "email", e.target.value)}
              placeholder="Reference's email address"
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={ref.phone}
              onChange={(e) => updateReference(index, "phone", e.target.value)}
              placeholder="Reference's phone number"
            />
          </div>

          <div>
            <Label>Professional Relationship</Label>
            <Input
              value={ref.relationship}
              onChange={(e) =>
                updateReference(index, "relationship", e.target.value)
              }
              placeholder="e.g. Direct Supervisor, Manager"
            />
          </div>

          <div>
            <Label>Years Known</Label>
            <Input
              type="number"
              min="0"
              step="0.5"
              value={ref.yearsKnown}
              onChange={(e) =>
                updateReference(index, "yearsKnown", e.target.value)
              }
              placeholder="Number of years"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default References;
