import { useState } from "react";
import { Button } from "@/components/ui/button";
import CareBookApplicationForm from "./care-book-application-form";
import CareHubRegistrationForm from "./care-hub-registration-form";

function Home() {
  const [activeForm, setActiveForm] = useState<"worker" | "hub" | null>(null);

  if (!activeForm) {
    return (
      <div className="w-screen min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome to Care Hub</h1>
        <div className="flex gap-4">
          <Button size="lg" onClick={() => setActiveForm("worker")}>
            Register as Care Worker
          </Button>
          <Button size="lg" onClick={() => setActiveForm("hub")}>
            Register as Care Hub
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => setActiveForm(null)}
      >
        Back to Selection
      </Button>
      {activeForm === "worker" ? (
        <CareBookApplicationForm />
      ) : (
        <CareHubRegistrationForm />
      )}
    </div>
  );
}

export default Home;
