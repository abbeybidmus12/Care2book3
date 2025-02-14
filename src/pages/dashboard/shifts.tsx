import DashboardLayout from "@/components/dashboard/layout";
import AvailableShifts from "@/components/dashboard/available-shifts";

export default function ShiftsPage() {
  return (
    <DashboardLayout>
      <AvailableShifts />
    </DashboardLayout>
  );
}
