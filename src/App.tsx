import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AIWriter from "./pages/AIWriter";
import AIProduct from "./pages/AIProduct";
import AIMarketing from "./pages/AIMarketing";
import AIContent from "./pages/AIContent";
import History from "./pages/History";
import LandingPage from "./pages/LandingPage";
import Settings from "./pages/Settings";

import Pricing from "./components/Pricing";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
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
      {/* PRICING */}
      {/* ================================= */}

      <Route
        path="/pricing"
        element={
          <ProtectedRoute>
            <Pricing />
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
  );
}