import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const DeclarationsSubmit = ({ formData = {}, updateFormData }) => {
  const data = {
    criminalRecord: "",
    criminalDetails: "",
    disciplinary: "",
    disciplinaryDetails: "",
    healthConditions: "",
    healthDetails: "",
    dataConsent: false,
    termsAccepted: false,
    declarationAccepted: false,
    ...formData,
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Criminal Record Declaration</h3>
        <RadioGroup
          value={data.criminalRecord}
          onValueChange={(value) => updateFormData("criminalRecord", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="criminal-no" />
            <Label htmlFor="criminal-no">
              I have no criminal convictions, cautions, reprimands or warnings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="criminal-yes" />
            <Label htmlFor="criminal-yes">
              I have criminal convictions, cautions, reprimands or warnings
            </Label>
          </div>
        </RadioGroup>
        {data.criminalRecord === "yes" && (
          <div>
            <Label>Please provide details</Label>
            <Textarea
              value={data.criminalDetails}
              onChange={(e) =>
                updateFormData("criminalDetails", e.target.value)
              }
              placeholder="Please provide details of any criminal convictions, cautions, reprimands or warnings"
              className="h-32"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disciplinary Action</h3>
        <RadioGroup
          value={data.disciplinary}
          onValueChange={(value) => updateFormData("disciplinary", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="disciplinary-no" />
            <Label htmlFor="disciplinary-no">
              I have never been subject to disciplinary action
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="disciplinary-yes" />
            <Label htmlFor="disciplinary-yes">
              I have been subject to disciplinary action
            </Label>
          </div>
        </RadioGroup>
        {data.disciplinary === "yes" && (
          <div>
            <Label>Please provide details</Label>
            <Textarea
              value={data.disciplinaryDetails}
              onChange={(e) =>
                updateFormData("disciplinaryDetails", e.target.value)
              }
              placeholder="Please provide details of any disciplinary action"
              className="h-32"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Health Declaration</h3>
        <RadioGroup
          value={data.healthConditions}
          onValueChange={(value) => updateFormData("healthConditions", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="health-no" />
            <Label htmlFor="health-no">
              I have no health conditions that may affect my work
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="health-yes" />
            <Label htmlFor="health-yes">
              I have health conditions that may affect my work
            </Label>
          </div>
        </RadioGroup>
        {data.healthConditions === "yes" && (
          <div>
            <Label>Please provide details</Label>
            <Textarea
              value={data.healthDetails}
              onChange={(e) => updateFormData("healthDetails", e.target.value)}
              placeholder="Please provide details of any health conditions that may affect your work"
              className="h-32"
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Declarations</h3>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="data-consent"
            checked={data.dataConsent}
            onCheckedChange={(checked) =>
              updateFormData("dataConsent", checked)
            }
          />
          <Label htmlFor="data-consent" className="text-sm">
            I consent to my personal data being processed in accordance with the
            Privacy Policy. I understand that my data will be stored securely
            and used only for purposes related to my application and potential
            employment.
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms-accepted"
            checked={data.termsAccepted}
            onCheckedChange={(checked) =>
              updateFormData("termsAccepted", checked)
            }
          />
          <Label htmlFor="terms-accepted" className="text-sm">
            I have read, understood and agree to the Terms and Conditions of
            registration.
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="declaration-accepted"
            checked={data.declarationAccepted}
            onCheckedChange={(checked) =>
              updateFormData("declarationAccepted", checked)
            }
          />
          <Label htmlFor="declaration-accepted" className="text-sm">
            I declare that all information provided in this application is true
            and complete to the best of my knowledge. I understand that any
            false statements or omissions may result in rejection of my
            application or termination of employment if already employed.
          </Label>
        </div>
      </div>
    </div>
  );
};

export default DeclarationsSubmit;
