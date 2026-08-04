import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AIWriter from "./pages/AIWriter";
import AIProduct from "./pages/AIProduct";
import AIMarketing from "./pages/AIMarketing";
import AIContent from "./pages/AIContent";
import History from "./pages/History";
import LandingPage from "./pages/LandingPage";

import Pricing from "./components/Pricing";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Landing */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Login */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Writer */}

      <Route
        path="/writer"
        element={
          <ProtectedRoute>
            <AIWriter />
          </ProtectedRoute>
        }
      />

      {/* Product */}

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <AIProduct />
          </ProtectedRoute>
        }
      />

      {/* Marketing */}

      <Route
        path="/marketing"
        element={
          <ProtectedRoute>
            <AIMarketing />
          </ProtectedRoute>
        }
      />

      {/* Content */}

      <Route
        path="/content"
        element={
          <ProtectedRoute>
            <AIContent />
          </ProtectedRoute>
        }
      />

      {/* History */}

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      {/* Pricing */}

      <Route
        path="/pricing"
        element={
          <ProtectedRoute>
            <Pricing />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}