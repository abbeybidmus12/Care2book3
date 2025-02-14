import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DocumentUpload = ({ formData = {}, updateFormData }) => {
  const data = {
    documents: formData.documents || {},
  };

  const requiredDocuments = [
    {
      id: "photo",
      name: "Passport-Style Photo",
      description: "A recent passport-style photograph",
    },
    {
      id: "id",
      name: "ID Document",
      description: "Passport or Driver's License",
    },
    {
      id: "proof_address",
      name: "Proof of Address",
      description: "Utility bill or bank statement (less than 3 months old)",
    },
    {
      id: "right_to_work",
      name: "Right to Work",
      description: "Visa, settled status, or other right to work documentation",
    },
    {
      id: "dbs",
      name: "DBS Certificate",
      description: "Enhanced DBS certificate (if you have one)",
    },
    {
      id: "qualifications",
      name: "Qualification Certificates",
      description: "Copies of relevant qualifications and certificates",
    },
  ];

  const handleFileChange = (documentId, file) => {
    updateFormData("documents", {
      ...data.documents,
      [documentId]: file,
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Required Documents</h3>
        <p className="text-sm text-muted-foreground">
          Please upload clear, legible scans or photos of the following
          documents. All documents must be in PDF, JPG, or PNG format.
        </p>
      </div>

      <div className="space-y-6">
        {requiredDocuments.map((doc) => (
          <div key={doc.id} className="p-4 border rounded-lg space-y-2 bg-card">
            <div className="flex justify-between items-start">
              <div>
                <Label className="text-base">{doc.name}</Label>
                <p className="text-sm text-muted-foreground">
                  {doc.description}
                </p>
              </div>
              {data.documents[doc.id] && (
                <div className="text-sm text-green-600">✓ Uploaded</div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                className="flex-1"
              />
              {data.documents[doc.id] && (
                <Button
                  variant="outline"
                  onClick={() => handleFileChange(doc.id, null)}
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm">
          Note: Your application cannot be processed until all required
          documents have been provided. We will verify all documents as part of
          our compliance process.
        </p>
      </div>
    </div>
  );
};

export default DocumentUpload;
