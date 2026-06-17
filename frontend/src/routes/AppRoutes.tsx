import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages — /about, /how-it-works, /success-stories, /contact all render Home
// Home reads the current pathname and scrolls to the correct section automatically
import Home from "../pages/public/Home/Home";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";

// Dashboard Pages
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import FindMatch from "../pages/dashboard/FindMatch/FindMatch";
import MyPets from "../pages/dashboard/MyPets/MyPets";
import Messages from "../pages/dashboard/Messages/Messages";
import Profile from "../pages/dashboard/Profile/Profile";

function AppRoutes() {
  return (
    <Routes>
      {/* All public section routes render <Home /> — it handles internal scrolling */}
      <Route path="/"                element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about"           element={<MainLayout><Home /></MainLayout>} />
      <Route path="/how-it-works"    element={<MainLayout><Home /></MainLayout>} />
      <Route path="/success-stories" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/contact"         element={<MainLayout><Home /></MainLayout>} />

      {/* Auth pages (no layout wrapper) */}
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected dashboard pages — redirect to /login when unauthenticated */}
      <Route path="/dashboard"  element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/find-match" element={<ProtectedRoute><DashboardLayout><FindMatch /></DashboardLayout></ProtectedRoute>} />
      <Route path="/my-pets"    element={<ProtectedRoute><DashboardLayout><MyPets /></DashboardLayout></ProtectedRoute>} />
      <Route path="/messages"   element={<ProtectedRoute><DashboardLayout><Messages /></DashboardLayout></ProtectedRoute>} />
      <Route path="/profile"    element={<ProtectedRoute><DashboardLayout><Profile /></DashboardLayout></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;