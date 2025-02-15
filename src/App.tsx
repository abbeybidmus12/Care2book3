import { Routes, Route, useRoutes, Navigate } from "react-router-dom";
import routes from "tempo-routes";

// Import layouts and auth
import CareHubDashboardLayout from "./components/care-hub-dashboard/layout";
import DashboardLayout from "./components/dashboard/layout";
import SignIn from "./components/auth/sign-in";
import SignUp from "./components/auth/sign-up";
import CareHubSignIn from "./components/auth/care-hub-sign-in";
import CareHubSignUp from "./components/auth/care-hub-sign-up";

// Import components
import CareHubDashboard from "./components/care-hub-dashboard/overview";
import CareHubCompliance from "./components/care-hub-dashboard/compliance";
import CareHubIncidents from "./components/care-hub-dashboard/incidents";
import CareHubInvoices from "./components/care-hub-dashboard/invoices";
import CareHubManageShifts from "./components/care-hub-dashboard/manage-shifts";
import CareHubPostShifts from "./components/care-hub-dashboard/post-shifts";
import CareHubReports from "./components/care-hub-dashboard/reports";
import CareHubSettings from "./components/care-hub-dashboard/settings";
import CareHubTimesheets from "./components/care-hub-dashboard/timesheets";
import CareHubWorkers from "./components/care-hub-dashboard/workers";

import DashboardOverview from "./components/dashboard/overview";
import MyAvailability from "./components/dashboard/my-availability";
import MyBookings from "./components/dashboard/my-bookings";
import MyFunctionality from "./components/dashboard/my-functionality";
import AvailableShifts from "./components/dashboard/available-shifts";
import Timesheet from "./components/dashboard/timesheet";
import Payslips from "./components/dashboard/payslips";
import DashboardReports from "./components/dashboard/reports";
import DashboardCompliance from "./components/dashboard/compliance";
import DashboardSettings from "./components/dashboard/settings";

export default function App() {
  return (
    <>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/care-hub/sign-in" element={<CareHubSignIn />} />
        <Route path="/care-hub/sign-up" element={<CareHubSignUp />} />

        {/* Care Hub Dashboard Routes */}
        <Route element={<CareHubDashboardLayout />}>
          <Route path="/care-hub" element={<CareHubDashboard />} />
          <Route path="/care-hub/compliance" element={<CareHubCompliance />} />
          <Route path="/care-hub/incidents" element={<CareHubIncidents />} />
          <Route path="/care-hub/invoices" element={<CareHubInvoices />} />
          <Route
            path="/care-hub/manage-shifts"
            element={<CareHubManageShifts />}
          />
          <Route path="/care-hub/post-shifts" element={<CareHubPostShifts />} />
          <Route path="/care-hub/reports" element={<CareHubReports />} />
          <Route path="/care-hub/settings" element={<CareHubSettings />} />
          <Route path="/care-hub/timesheets" element={<CareHubTimesheets />} />
          <Route path="/care-hub/workers" element={<CareHubWorkers />} />
        </Route>

        {/* Care Worker Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route path="/dashboard/availability" element={<MyAvailability />} />
          <Route path="/dashboard/bookings" element={<MyBookings />} />
          <Route
            path="/dashboard/my-functionality"
            element={<MyFunctionality />}
          />
          <Route path="/dashboard/shifts" element={<AvailableShifts />} />
          <Route path="/dashboard/timesheet" element={<Timesheet />} />
          <Route path="/dashboard/payslips" element={<Payslips />} />
          <Route path="/dashboard/reports" element={<DashboardReports />} />
          <Route
            path="/dashboard/compliance"
            element={<DashboardCompliance />}
          />
          <Route path="/dashboard/settings" element={<DashboardSettings />} />
        </Route>

        {/* Add this before any catchall route */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </>
  );
}
