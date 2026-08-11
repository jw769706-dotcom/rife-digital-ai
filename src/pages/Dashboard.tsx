import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardContent from "../components/dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Selamat datang kembali 👋"
    >
      <DashboardContent />
    </DashboardLayout>
  );
}