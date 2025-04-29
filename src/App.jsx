
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/contexts/AuthContext";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import CreateProfile from "@/pages/CreateProfile";
import OfferSession from "@/pages/OfferSession";
import ViewCredits from "@/pages/ViewCredits";
import Dashboard from "@/pages/Dashboard";
import PrivateRoute from "@/components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-profile"
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/offer-session"
              element={
                <PrivateRoute>
                  <OfferSession />
                </PrivateRoute>
              }
            />
            <Route
              path="/view-credits"
              element={
                <PrivateRoute>
                  <ViewCredits />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
