import DashboardSidebar from "../components/layout/DashboardSidebar/DashboardSidebar";
import DashboardHeader from "../components/layout/DashboardHeader/DashboardHeader";
import "./DashboardLayout.css";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

/**
 * Structural wrapper layout for dashboard pages providing the
 * vertical Sidebar navigation, Top Header panel, and offset boundaries.
 */
function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout-container">
      {/* Sidebar fixed to the left side */}
      <DashboardSidebar />

      {/* Main viewport offsetting the sidebar and top header */}
      <div className="dashboard-main-content">
        <DashboardHeader />
        <main className="dashboard-page-body">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
