import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  Clock,
  FileText,
  AlertTriangle,
  Building2,
  Settings,
  Bell,
  Wallet,
} from "lucide-react";

const navigation = [
  {
    name: "Overview",
    href: "/careagencydashboard",
    icon: Home,
    color: "text-blue-500",
  },
  {
    name: "Care Workers",
    href: "/careagencydashboard/workers",
    icon: Users,
    color: "text-purple-500",
  },
  {
    name: "Timesheets",
    href: "/careagencydashboard/timesheets",
    icon: Clock,
    color: "text-green-500",
  },
  {
    name: "Payments",
    href: "/careagencydashboard/payments",
    icon: Wallet,
    color: "text-yellow-500",
  },
  {
    name: "Invoices",
    href: "/careagencydashboard/invoices",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    name: "Incidents",
    href: "/careagencydashboard/incidents",
    icon: AlertTriangle,
    color: "text-red-500",
  },
  {
    name: "Care Hubs",
    href: "/careagencydashboard/care-hubs",
    icon: Building2,
    color: "text-indigo-500",
  },
  {
    name: "Reports",
    href: "/careagencydashboard/reports",
    icon: FileText,
    color: "text-orange-500",
  },
  {
    name: "Settings",
    href: "/careagencydashboard/settings",
    icon: Settings,
    color: "text-gray-500",
  },
];

interface CareAgencyDashboardLayoutProps {
  children: React.ReactNode;
}

export default function CareAgencyDashboardLayout({
  children,
}: CareAgencyDashboardLayoutProps) {
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
              <h1 className="text-xl font-bold">Welcome, Elite Care Agency</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" />
                  <span className="text-sm font-medium">Admin</span>
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
            <div className="bg-white rounded-lg shadow">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
