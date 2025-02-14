import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center space-y-8">
      <h1 className="text-3xl font-bold text-center">Welcome to Care Hub</h1>

      <div className="space-y-8 w-full max-w-md">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Dashboards</h2>
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate("/dashboard")}
          >
            Care Worker Dashboard
          </Button>
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate("/care-hub")}
          >
            Care Hub Dashboard
          </Button>
          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate("/care-agency")}
          >
            Care Agency Dashboard
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center">Registration</h2>
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={() => navigate("/register/worker")}
          >
            Register as Care Worker
          </Button>
          <Button
            className="w-full"
            size="lg"
            variant="outline"
            onClick={() => navigate("/register/care-hub")}
          >
            Register as Care Hub
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
