import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import DashboardContent from "../components/dashboard/DashboardContent";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#090909]">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          <DashboardContent />
        </main>

      </div>

    </div>
  );
}