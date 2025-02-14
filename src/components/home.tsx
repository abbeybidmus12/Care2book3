import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to CareBook</h1>
        <p className="text-gray-600">Choose your portal to continue</p>

        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              Care Worker Portal
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/register/worker")}
            >
              Register as Care Worker
            </Button>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate("/care-hub")}
            >
              Care Hub Portal
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/register/care-hub")}
            >
              Register as Care Hub
            </Button>
          </div>

          <div className="space-y-2">
            <Button
              className="w-full"
              size="lg"
              onClick={() => navigate("/care-agency")}
            >
              Care Agency Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
