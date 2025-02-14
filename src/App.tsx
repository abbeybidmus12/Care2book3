import { Route, Routes } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import Home from "@/components/home";
import CareBookApplicationForm from "@/components/care-book-application-form";
import CareHubRegistrationForm from "@/components/care-hub-registration-form";

// Care Worker Dashboard Components
import DashboardLayout from "@/components/dashboard/layout";
import DashboardOverview from "@/components/dashboard/overview";
import AvailableShifts from "@/components/dashboard/available-shifts";
import MyBookings from "@/components/dashboard/my-bookings";
import MyAvailability from "@/components/dashboard/my-availability";
import Timesheet from "@/components/dashboard/timesheet";
import Payslips from "@/components/dashboard/payslips";
import DashboardReports from "@/components/dashboard/reports";
import DashboardSettings from "@/components/dashboard/settings";

// Care Hub Dashboard Components
import CareHubDashboardLayout from "@/components/care-hub-dashboard/layout";
import CareHubOverview from "@/components/care-hub-dashboard/overview";
import PostShifts from "@/components/care-hub-dashboard/post-shifts";
import ManageShifts from "@/components/care-hub-dashboard/manage-shifts";
import CareHubTimesheets from "@/components/care-hub-dashboard/timesheets";
import CareHubWorkers from "@/components/care-hub-dashboard/workers";
import CareHubIncidents from "@/components/care-hub-dashboard/incidents";
import CareHubReports from "@/components/care-hub-dashboard/reports";
import CareHubInvoices from "@/components/care-hub-dashboard/invoices";
import CareHubSettings from "@/components/care-hub-dashboard/settings";

// Care Agency Dashboard Components
import CareAgencyDashboardLayout from "@/components/care-agency-dashboard/layout";
import CareAgencyOverview from "@/components/care-agency-dashboard/overview";
import CareAgencyWorkers from "@/components/care-agency-dashboard/workers";
import CareAgencyTimesheets from "@/components/care-agency-dashboard/timesheets";
import CareAgencyPayments from "@/components/care-agency-dashboard/payments";
import CareAgencyIncidents from "@/components/care-agency-dashboard/incidents";
import CareAgencyCareHubs from "@/components/care-agency-dashboard/care-hubs";
import CareAgencyReports from "@/components/care-agency-dashboard/reports";
import CareAgencySettings from "@/components/care-agency-dashboard/settings";
import CareAgencyInvoices from "@/components/care-agency-dashboard/invoices";

function App() {
  return (
    <>
      {/* For the tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}
      <Routes>
        {/* Landing and Registration Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register/worker" element={<CareBookApplicationForm />} />
        <Route
          path="/register/care-hub"
          element={<CareHubRegistrationForm />}
        />

        {/* Care Worker Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="shifts" element={<AvailableShifts />} />
          <Route path="bookings" element={<MyBookings />} />
          <Route path="availability" element={<MyAvailability />} />
          <Route path="timesheet" element={<Timesheet />} />
          <Route path="payslips" element={<Payslips />} />
          <Route path="reports" element={<DashboardReports />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        {/* Care Hub Dashboard Routes */}
        <Route path="/care-hub" element={<CareHubDashboardLayout />}>
          <Route index element={<CareHubOverview />} />
          <Route path="post-shifts" element={<PostShifts />} />
          <Route path="manage-shifts" element={<ManageShifts />} />
          <Route path="timesheets" element={<CareHubTimesheets />} />
          <Route path="workers" element={<CareHubWorkers />} />
          <Route path="incidents" element={<CareHubIncidents />} />
          <Route path="reports" element={<CareHubReports />} />
          <Route path="invoices" element={<CareHubInvoices />} />
          <Route path="settings" element={<CareHubSettings />} />
        </Route>

        {/* Care Agency Dashboard Routes */}
        <Route path="/care-agency" element={<CareAgencyDashboardLayout />}>
          <Route index element={<CareAgencyOverview />} />
          <Route path="workers" element={<CareAgencyWorkers />} />
          <Route path="timesheets" element={<CareAgencyTimesheets />} />
          <Route path="payments" element={<CareAgencyPayments />} />
          <Route path="incidents" element={<CareAgencyIncidents />} />
          <Route path="care-hubs" element={<CareAgencyCareHubs />} />
          <Route path="reports" element={<CareAgencyReports />} />
          <Route path="settings" element={<CareAgencySettings />} />
          <Route path="invoices" element={<CareAgencyInvoices />} />
        </Route>

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
}

export default App;
