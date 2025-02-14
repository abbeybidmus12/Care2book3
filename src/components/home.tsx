import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg space-y-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center">
          Welcome to Care Management System
        </h1>
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Dashboards</h2>
            <Button
              className="w-full"
              onClick={() => navigate("/workerdashboard")}
            >
              Care Worker Dashboard
            </Button>
            <Button
              className="w-full"
              onClick={() => navigate("/carehubdashboard")}
            >
              Care Hub Dashboard
            </Button>
            <Button
              className="w-full"
              onClick={() => navigate("/careagencydashboard")}
            >
              Care Agency Dashboard
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Registration</h2>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/worker-registration")}
            >
              Register as Care Worker
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/carehub-registration")}
            >
              Register as Care Hub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
