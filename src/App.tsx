import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AIWriter = lazy(() => import("./pages/AIWriter"));
const AIProduct = lazy(() => import("./pages/AIProduct"));
const AIMarketing = lazy(() => import("./pages/AIMarketing"));
const AIContent = lazy(() => import("./pages/AIContent"));
const History = lazy(() => import("./pages/History"));
const Settings = lazy(() => import("./pages/Settings"));

const Pricing = lazy(() => import("./components/Pricing"));
const DashboardLayout = lazy(
  () => import("./components/layout/DashboardLayout")
);

const ProtectedRoute = lazy(
  () => import("./components/ProtectedRoute")
);

function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-yellow-400/20 border-t-yellow-400" />

        <p className="text-sm text-gray-500">
          Memuat Rife Digital AI...
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* ================================= */}
        {/* LANDING */}
        {/* ================================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* ================================= */}
        {/* LOGIN */}
        {/* ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ================================= */}
        {/* DASHBOARD */}
        {/* ================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* WRITER */}
        {/* ================================= */}

        <Route
          path="/writer"
          element={
            <ProtectedRoute>
              <AIWriter />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* PRODUCT */}
        {/* ================================= */}

        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <AIProduct />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* MARKETING */}
        {/* ================================= */}

        <Route
          path="/marketing"
          element={
            <ProtectedRoute>
              <AIMarketing />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* CONTENT */}
        {/* ================================= */}

        <Route
          path="/content"
          element={
            <ProtectedRoute>
              <AIContent />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* HISTORY */}
        {/* ================================= */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* SETTINGS */}
        {/* ================================= */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* PRICING / UPGRADE */}
        {/* ================================= */}

        <Route
          path="/pricing"
          element={
            <ProtectedRoute>
              <DashboardLayout
                title="Upgrade"
                subtitle="Pilih paket yang sesuai dengan kebutuhanmu."
              >
                <Pricing />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================================= */}
        {/* FALLBACK */}
        {/* ================================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </Suspense>
  );
}