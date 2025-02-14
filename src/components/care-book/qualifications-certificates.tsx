import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const QualificationsAndCertificates = ({ formData = {}, updateFormData }) => {
  const data = {
    qualifications: formData.qualifications || [
      { type: "", name: "", institution: "", yearCompleted: "" },
    ],
    certificates: formData.certificates || [
      { name: "", issuingBody: "", expiryDate: "" },
    ],
    additionalTraining: formData.additionalTraining || "",
  };

  const addQualification = () => {
    const newQualifications = [
      ...data.qualifications,
      { type: "", name: "", institution: "", yearCompleted: "" },
    ];
    updateFormData("qualifications", newQualifications);
  };

  const updateQualification = (index, field, value) => {
    const newQualifications = [...data.qualifications];
    newQualifications[index] = {
      ...newQualifications[index],
      [field]: value,
    };
    updateFormData("qualifications", newQualifications);
  };

  const addCertificate = () => {
    const newCertificates = [
      ...data.certificates,
      { name: "", issuingBody: "", expiryDate: "" },
    ];
    updateFormData("certificates", newCertificates);
  };

  const updateCertificate = (index, field, value) => {
    const newCertificates = [...data.certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [field]: value,
    };
    updateFormData("certificates", newCertificates);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Qualifications</h3>
        {data.qualifications.map((qual, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div>
              <Label>Type of Qualification</Label>
              <Select
                value={qual.type}
                onValueChange={(value) =>
                  updateQualification(index, "type", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select qualification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="degree">Degree</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Qualification Name</Label>
              <Input
                value={qual.name}
                onChange={(e) =>
                  updateQualification(index, "name", e.target.value)
                }
                placeholder="e.g. Bachelor of Nursing"
              />
            </div>

            <div>
              <Label>Institution</Label>
              <Input
                value={qual.institution}
                onChange={(e) =>
                  updateQualification(index, "institution", e.target.value)
                }
                placeholder="Institution name"
              />
            </div>

            <div>
              <Label>Year Completed</Label>
              <Input
                type="number"
                min="1950"
                max={new Date().getFullYear()}
                value={qual.yearCompleted}
                onChange={(e) =>
                  updateQualification(index, "yearCompleted", e.target.value)
                }
                placeholder="Year"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addQualification}
          className="w-full"
        >
          Add Another Qualification
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Professional Certificates</h3>
        {data.certificates.map((cert, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div>
              <Label>Certificate Name</Label>
              <Input
                value={cert.name}
                onChange={(e) =>
                  updateCertificate(index, "name", e.target.value)
                }
                placeholder="e.g. First Aid Certificate"
              />
            </div>

            <div>
              <Label>Issuing Body</Label>
              <Input
                value={cert.issuingBody}
                onChange={(e) =>
                  updateCertificate(index, "issuingBody", e.target.value)
                }
                placeholder="Name of issuing organization"
              />
            </div>

            <div>
              <Label>Expiry Date</Label>
              <Input
                type="date"
                value={cert.expiryDate}
                onChange={(e) =>
                  updateCertificate(index, "expiryDate", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={addCertificate}
          className="w-full"
        >
          Add Another Certificate
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Additional Training</h3>
        <div>
          <Label>List any additional training or skills</Label>
          <Textarea
            value={data.additionalTraining}
            onChange={(e) =>
              updateFormData("additionalTraining", e.target.value)
            }
            placeholder="Describe any additional training, courses, or relevant skills"
            className="h-32"
          />
        </div>
      </div>
    </div>
  );
};

export default QualificationsAndCertificates;
