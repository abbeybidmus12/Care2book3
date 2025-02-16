import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileCheck, Upload, Clock, AlertCircle } from "lucide-react";
import { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabase";

interface User {
  workerId?: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

import { useUser } from "../../lib/session"; // Import hook to get user details

interface FormData {
  firstName: string;
  lastName: string;
  workerId: string;
  email: string;  // Add email field
  phone: string;
  dob: string;
  ni: string;
  address: string;
  nextOfKinName: string;
  nextOfKinRelation: string;
  nextOfKinPhone: string;
  nextOfKinEmail: string;
  primaryRole: string;
  yearsExperience: string;
  maxHours: string;
  travelDistance: string;
  skills: string[];
  shiftTypes: string[];
  dbsCertNumber: string;
  dbsInfo: string;
  bankAccountName: string;
  bankName: string;
  sortCode: string;
  accountNumber: string;
  paymentFrequency: string;
}

export default function Compliance() {
  const { user } = useUser(); // Get the signed-in user details

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    workerId: "",
    email: "",
    phone: "",
    dob: "",
    ni: "",
    address: "",
    nextOfKinName: "",
    nextOfKinRelation: "",
    nextOfKinPhone: "",
    nextOfKinEmail: "",
    primaryRole: "",
    yearsExperience: "",
    maxHours: "",
    travelDistance: "",
    skills: [],
    shiftTypes: [],
    dbsCertNumber: "",
    dbsInfo: "",
    bankAccountName: "",
    bankName: "",
    sortCode: "",
    accountNumber: "",
    paymentFrequency: "weekly"
  });

  useEffect(() => {
    const workerDetails = JSON.parse(localStorage.getItem("workerDetails") || "{}");
    setFormData(prev => ({
      ...prev,
      firstName: workerDetails.first_name || "",
      lastName: workerDetails.last_name || "",
      workerId: workerDetails.worker_id || "",
      email: workerDetails.email || ""
    }));
  }, []);

  const updateFormField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleArrayField = (field: 'skills' | 'shiftTypes', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  // This would come from your auth system
  const userProfile = {
    name: "John Doe",
    email: "john.doe@example.com",
    workerId: "CW123456",
  };

  const onboardingProgress = {
    totalSteps: 7,
    completedSteps: 3,
    status: "in-progress",
    stages: [
      { name: "Basic Information", status: "completed" },
      { name: "Documents Uploaded", status: "completed" },
      { name: "Resume Verified", status: "completed" },
      { name: "Right to Work Check", status: "in-progress" },
      { name: "References Check", status: "pending" },
      { name: "DBS Check", status: "pending" },
      { name: "Interview", status: "not-started" },
    ],
  };

  const handleSubmit = async () => {
    try {
      const { error } = await supabase
        .from("careworker_reg")
        .update({
          phone: formData.phone,
          dob: formData.dob,
          ni: formData.ni,
          address: formData.address,
          next_of_kin_name: formData.nextOfKinName,
          next_of_kin_relation: formData.nextOfKinRelation,
          next_of_kin_phone: formData.nextOfKinPhone,
          next_of_kin_email: formData.nextOfKinEmail,
          primary_role: formData.primaryRole,
          years_experience: formData.yearsExperience,
          max_hours: formData.maxHours,
          travel_distance: formData.travelDistance,
          skills: formData.skills,
          shift_types: formData.shiftTypes,
          dbs_cert_number: formData.dbsCertNumber,
          dbs_info: formData.dbsInfo,
          bank_account_name: formData.bankAccountName,
          bank_name: formData.bankName,
          sort_code: formData.sortCode,
          account_number: formData.accountNumber,
          payment_frequency: formData.paymentFrequency,
        })
        .eq("worker_id", formData.workerId);

      if (error) throw error;

      alert("Compliance form submitted successfully!");
    } catch (error) {
      console.error("Error submitting compliance form:", error);
      alert("Error submitting compliance form");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Onboarding Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={(onboardingProgress.completedSteps / onboardingProgress.totalSteps) * 100} />
          
          <div className="grid gap-4 mt-4">
            {onboardingProgress.stages.map((stage, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {stage.status === "completed" && <FileCheck className="h-4 w-4 text-green-500" />}
                  {stage.status === "in-progress" && <Clock className="h-4 w-4 text-blue-500" />}
                  {stage.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
                  {stage.status === "not-started" && <AlertCircle className="h-4 w-4 text-gray-400" />}
                  <span className="text-sm">{stage.name}</span>
                </div>
                <Badge
                  variant={
                    stage.status === "completed"
                      ? "success"
                      : stage.status === "in-progress"
                      ? "default"
                      : "secondary"
                  }
                >
                  {stage.status.replace("-", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Form */}
      <Tabs defaultValue="basic-info">
        <TabsList>
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="preferences">Role & Preferences</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
          <TabsTrigger value="dbs">DBS Check</TabsTrigger>
          <TabsTrigger value="bank">Bank Details</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded col-span-2">
                  <p className="text-sm">
                    Worker ID: <span className="font-medium">{formData.workerId}</span>
                  </p>
                </div>
                <div>
                  <Label>First Name</Label>
                  <Input value={formData.firstName} disabled />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input value={formData.lastName} disabled />
                </div>
                <div className="col-span-2">
                  <Label>Email</Label>
                  <Input value={formData.email} disabled />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input 
                    type="tel" 
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => updateFormField('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input 
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateFormField('dob', e.target.value)}
                  />
                </div>
                <div>
                  <Label>National Insurance Number</Label>
                  <Input 
                    placeholder="Enter your NI number"
                    value={formData.ni}
                    onChange={(e) => updateFormField('ni', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Current Address</Label>
                  <Input 
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={(e) => updateFormField('address', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next of Kin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="Next of kin name"
                    value={formData.nextOfKinName}
                    onChange={(e) => updateFormField('nextOfKinName', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Relationship</Label>
                  <Input 
                    placeholder="e.g. Spouse, Parent"
                    value={formData.nextOfKinRelation}
                    onChange={(e) => updateFormField('nextOfKinRelation', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input 
                    type="tel" 
                    placeholder="Next of kin phone number"
                    value={formData.nextOfKinPhone}
                    onChange={(e) => updateFormField('nextOfKinPhone', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="Next of kin email"
                    value={formData.nextOfKinEmail}
                    onChange={(e) => updateFormField('nextOfKinEmail', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role & Preferences */}
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Primary Role</Label>
                  <Input 
                    placeholder="e.g. Healthcare Assistant, Registered Nurse"
                    value={formData.primaryRole}
                    onChange={(e) => updateFormField('primaryRole', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input 
                    type="number" 
                    placeholder="Enter years of experience"
                    value={formData.yearsExperience}
                    onChange={(e) => updateFormField('yearsExperience', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills & Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Manual Handling",
                  "Medication Administration",
                  "First Aid",
                  "Basic Life Support",
                  "Infection Control",
                  "Dementia Care",
                  "End of Life Care",
                  "Mental Health Awareness",
                  "Learning Disabilities",
                  "Personal Care",
                  "Record Keeping",
                  "Risk Assessment",
                ].map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={skill} 
                      className="rounded border-gray-300"
                      checked={formData.skills.includes(skill)}
                      onChange={() => toggleArrayField('skills', skill)}
                    />
                    <Label htmlFor={skill}>{skill}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shift Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Preferred Shift Types</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {[
                      "Early Shifts (e.g. 7am-3pm)",
                      "Late Shifts (e.g. 2pm-10pm)",
                      "Night Shifts (e.g. 9pm-7am)",
                      "Long Day Shifts (e.g. 7am-7pm)",
                      "Weekends Only",
                      "Weekdays Only",
                    ].map((shift) => (
                      <div key={shift} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={shift} 
                          className="rounded border-gray-300"
                          checked={formData.shiftTypes.includes(shift)}
                          onChange={() => toggleArrayField('shiftTypes', shift)}
                        />
                        <Label htmlFor={shift}>{shift}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Maximum Hours per Week</Label>
                  <Input 
                    type="number" 
                    placeholder="Enter maximum hours"
                    value={formData.maxHours}
                    onChange={(e) => updateFormField('maxHours', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Travel Distance Preference</Label>
                  <Input 
                    type="number" 
                    placeholder="Maximum travel distance in miles"
                    value={formData.travelDistance}
                    onChange={(e) => updateFormField('travelDistance', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label>Resume/CV</Label>
                  <div className="flex items-center gap-4">
                    <Input type="file" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Qualifications</Label>
                  <div className="flex items-center gap-4">
                    <Input type="file" multiple />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Upload all relevant certificates and qualifications</p>
                </div>

                <div className="space-y-2">
                  <Label>Right to Work Documents</Label>
                  <div className="flex items-center gap-4">
                    <Input type="file" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Passport, visa, or other proof of right to work</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* References */}
        <TabsContent value="references" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional References</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Reference 1 */}
              <div className="space-y-4">
                <h4 className="font-medium">Reference 1</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Reference name" />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input placeholder="Reference job title" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input placeholder="Company name" />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Input placeholder="e.g. Manager, Supervisor" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Reference email" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input type="tel" placeholder="Reference phone number" />
                  </div>
                </div>
              </div>

              {/* Reference 2 */}
              <div className="space-y-4">
                <h4 className="font-medium">Reference 2</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Reference name" />
                  </div>
                  <div>
                    <Label>Job Title</Label>
                    <Input placeholder="Reference job title" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input placeholder="Company name" />
                  </div>
                  <div>
                    <Label>Relationship</Label>
                    <Input placeholder="e.g. Manager, Supervisor" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="Reference email" />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input type="tel" placeholder="Reference phone number" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* DBS Check */}
        <TabsContent value="dbs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DBS Check Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Do you have an existing DBS certificate?</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="outline">Yes</Button>
                    <Button variant="outline">No</Button>
                  </div>
                </div>

                <div>
                  <Label>DBS Certificate Number (if available)</Label>
                  <Input 
                    placeholder="Enter DBS certificate number"
                    value={formData.dbsCertNumber}
                    onChange={(e) => updateFormField('dbsCertNumber', e.target.value)}
                  />
                </div>

                <div>
                  <Label>DBS Certificate</Label>
                  <div className="flex items-center gap-4">
                    <Input type="file" />
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Upload your current DBS certificate if you have one
                  </p>
                </div>

                <div>
                  <Label>Additional Information</Label>
                  <Textarea 
                    placeholder="Please provide any additional information regarding your DBS check"
                    value={formData.dbsInfo}
                    onChange={(e) => updateFormField('dbsInfo', e.target.value)}
                    className="h-32"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Details */}
        <TabsContent value="bank" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bank Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label>Account Holder Name</Label>
                  <Input 
                    placeholder="Enter account holder name"
                    value={formData.bankAccountName}
                    onChange={(e) => updateFormField('bankAccountName', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Bank Name</Label>
                  <Input 
                    placeholder="Enter bank name"
                    value={formData.bankName}
                    onChange={(e) => updateFormField('bankName', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Sort Code</Label>
                    <Input 
                      placeholder="XX-XX-XX"
                      value={formData.sortCode}
                      onChange={(e) => updateFormField('sortCode', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Account Number</Label>
                    <Input 
                      placeholder="Enter 8-digit account number"
                      value={formData.accountNumber}
                      onChange={(e) => updateFormField('accountNumber', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Payment Frequency</Label>
                  <select 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                    value={formData.paymentFrequency}
                    onChange={(e) => updateFormField('paymentFrequency', e.target.value)}
                  >
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={handleSubmit}>Submit Application</Button>
      </div>
    </div>
  );
}