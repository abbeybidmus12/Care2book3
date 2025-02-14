import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

import BasicInformation from "./care-book/basic-information";
import AddressAndEmergencyContact from "./care-book/address-emergency-contact";
import QualificationsAndCertificates from "./care-book/qualifications-certificates";
import References from "./care-book/references";
import WorkPreferences from "./care-book/work-preferences";
import DocumentUpload from "./care-book/document-upload";
import DeclarationsSubmit from "./care-book/declarations-submit";

const CareBookApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    staffId: `CB${Math.floor(100000 + Math.random() * 900000)}`, // Generates CB followed by 6 random digits
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <AddressAndEmergencyContact
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <QualificationsAndCertificates
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <References formData={formData} updateFormData={updateFormData} />
        );
      case 5:
        return (
          <WorkPreferences
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 6:
        return (
          <DocumentUpload formData={formData} updateFormData={updateFormData} />
        );
      case 7:
        return (
          <DeclarationsSubmit
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Address & Emergency Contact";
      case 3:
        return "Qualifications & Certificates";
      case 4:
        return "References";
      case 5:
        return "Work Preferences";
      case 6:
        return "Document Upload";
      case 7:
        return "Declarations & Submit";
      default:
        return "";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <h1 className="text-2xl font-bold mb-4">
          Care Worker Registration Form
        </h1>
        <CardTitle>{getStepTitle()}</CardTitle>
        <Progress value={(currentStep / 7) * 100} className="mt-2" />
        <div className="text-sm text-gray-500 mt-2">
          Step {currentStep} of 7
        </div>
      </CardHeader>

      <CardContent>{renderStep()}</CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        {currentStep === 7 ? (
          <Button onClick={handleSubmit}>Submit Application</Button>
        ) : (
          <Button onClick={handleNext}>Next</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CareBookApplicationForm;
