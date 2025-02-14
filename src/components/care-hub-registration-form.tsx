import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Import all step components
import Step1_BasicInfo from "./care-hub/basic-info";
import Step2_ContactDetails from "./care-hub/contact-details";
import Step3_Location from "./care-hub/location";
import Step4_Services from "./care-hub/services";
import Step5_Banking from "./care-hub/banking";

const CareHubRegistrationForm = () => {
  const [formState, setFormState] = useState({
    currentStep: 1,
    formData: {
      careHomeId: `CH${Math.floor(100000 + Math.random() * 900000)}`,
    },
  });

  const updateFormData = (field: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    if (formState.currentStep < 5) {
      setFormState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }));
    }
  };

  const prevStep = () => {
    if (formState.currentStep > 1) {
      setFormState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }));
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formState.formData);
  };

  const renderStep = () => {
    const { currentStep, formData } = formState;
    switch (currentStep) {
      case 1:
        return (
          <Step1_BasicInfo
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <Step2_ContactDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 3:
        return (
          <Step3_Location formData={formData} updateFormData={updateFormData} />
        );
      case 4:
        return (
          <Step4_Services formData={formData} updateFormData={updateFormData} />
        );
      case 5:
        return (
          <Step5_Banking formData={formData} updateFormData={updateFormData} />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    const { currentStep } = formState;
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Contact Details";
      case 3:
        return "Location & Capacity";
      case 4:
        return "Service Details";
      case 5:
        return "Banking Details";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold mb-4">Care Hub Registration</h1>
          <CardTitle>{getStepTitle()}</CardTitle>
          <Progress
            value={(formState.currentStep / 5) * 100}
            className="mt-2"
          />
          <div className="text-sm text-gray-500 mt-2">
            Step {formState.currentStep} of 5
          </div>
        </CardHeader>

        <CardContent>{renderStep()}</CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={formState.currentStep === 1}
          >
            Previous
          </Button>
          {formState.currentStep === 5 ? (
            <Button onClick={handleSubmit}>Submit Registration</Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CareHubRegistrationForm;
