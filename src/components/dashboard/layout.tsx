import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Home, Settings, Bell } from "lucide-react";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home, color: "text-blue-500" },
  {
    name: "Available Shifts",
    href: "/dashboard/shifts",
    icon: Calendar,
    color: "text-purple-500",
  },
  {
    name: "My Bookings",
    href: "/dashboard/bookings",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    name: "My Availability",
    href: "/dashboard/availability",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    name: "Timesheet",
    href: "/dashboard/timesheet",
    icon: FileText,
    color: "text-yellow-500",
  },
  {
    name: "Payslips",
    href: "/dashboard/payslips",
    icon: FileText,
    color: "text-pink-500",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: Clock,
    color: "text-red-500",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    color: "text-gray-500",
  },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-1 flex items-center pl-64">
              <h1 className="text-xl font-bold">Welcome, John Doe</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0 fixed top-0 bottom-0 bg-white border-r overflow-y-auto z-50">
          <div className="pt-16">
            <nav className="flex flex-col space-y-[1.575rem]">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={
                      cn(
                        "w-full justify-start gap-3",
                        currentPath === item.href
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-50",
                      ) + " mx-0 px-4 py-0.25"
                    }
                    onClick={() => navigate(item.href)}
                  >
                    <Icon className={cn("h-5 w-5", item.color)} />
                    {item.name}
                  </Button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
