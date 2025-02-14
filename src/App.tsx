import { Route, Routes } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "@/components/home";
import DashboardPage from "@/pages/dashboard";
import ShiftsPage from "@/pages/dashboard/shifts";
import BookingsPage from "@/pages/dashboard/bookings";
import AvailabilityPage from "@/pages/dashboard/availability";
import TimesheetPage from "@/pages/dashboard/timesheet";
import PayslipsPage from "@/pages/dashboard/payslips";
import ReportsPage from "@/pages/dashboard/reports";
import SettingsPage from "@/pages/dashboard/settings";

// Care Hub Routes
import CareHubOverviewPage from "@/pages/care-hub";
import CareHubPostShiftsPage from "@/pages/care-hub/post-shifts";
import CareHubManageShiftsPage from "@/pages/care-hub/manage-shifts";
import CareHubTimesheetsPage from "@/pages/care-hub/timesheets";
import CareHubWorkersPage from "@/pages/care-hub/workers";
import CareHubIncidentsPage from "@/pages/care-hub/incidents";
import CareHubReportsPage from "@/pages/care-hub/reports";
import CareHubInvoicesPage from "@/pages/care-hub/invoices";
import CareHubSettingsPage from "@/pages/care-hub/settings";

// Care Agency Routes
import CareAgencyOverviewPage from "@/pages/care-agency";
import CareAgencyWorkersPage from "@/pages/care-agency/workers";
import CareAgencyTimesheetsPage from "@/pages/care-agency/timesheets";
import CareAgencyPaymentsPage from "@/pages/care-agency/payments";
import CareAgencyIncidentsPage from "@/pages/care-agency/incidents";
import CareAgencyCareHubsPage from "@/pages/care-agency/care-hubs";
import CareAgencyReportsPage from "@/pages/care-agency/reports";
import CareAgencySettingsPage from "@/pages/care-agency/settings";
import CareAgencyInvoicesPage from "@/pages/care-agency/invoices";

function App() {
  return (
    <>
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Care Worker Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/shifts" element={<ShiftsPage />} />
        <Route path="/dashboard/bookings" element={<BookingsPage />} />
        <Route path="/dashboard/availability" element={<AvailabilityPage />} />
        <Route path="/dashboard/timesheet" element={<TimesheetPage />} />
        <Route path="/dashboard/payslips" element={<PayslipsPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />

        {/* Care Hub Dashboard Routes */}
        <Route path="/care-hub" element={<CareHubOverviewPage />} />
        <Route
          path="/care-hub/post-shifts"
          element={<CareHubPostShiftsPage />}
        />
        <Route
          path="/care-hub/manage-shifts"
          element={<CareHubManageShiftsPage />}
        />
        <Route
          path="/care-hub/timesheets"
          element={<CareHubTimesheetsPage />}
        />
        <Route path="/care-hub/workers" element={<CareHubWorkersPage />} />
        <Route path="/care-hub/incidents" element={<CareHubIncidentsPage />} />
        <Route path="/care-hub/reports" element={<CareHubReportsPage />} />
        <Route path="/care-hub/invoices" element={<CareHubInvoicesPage />} />
        <Route path="/care-hub/settings" element={<CareHubSettingsPage />} />

        {/* Care Agency Dashboard Routes */}
        <Route path="/care-agency" element={<CareAgencyOverviewPage />} />
        <Route
          path="/care-agency/workers"
          element={<CareAgencyWorkersPage />}
        />
        <Route
          path="/care-agency/timesheets"
          element={<CareAgencyTimesheetsPage />}
        />
        <Route
          path="/care-agency/payments"
          element={<CareAgencyPaymentsPage />}
        />
        <Route
          path="/care-agency/incidents"
          element={<CareAgencyIncidentsPage />}
        />
        <Route
          path="/care-agency/care-hubs"
          element={<CareAgencyCareHubsPage />}
        />
        <Route
          path="/care-agency/reports"
          element={<CareAgencyReportsPage />}
        />
        <Route
          path="/care-agency/settings"
          element={<CareAgencySettingsPage />}
        />
        <Route
          path="/care-agency/invoices"
          element={<CareAgencyInvoicesPage />}
        />

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
}

export default App;
