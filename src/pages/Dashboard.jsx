
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Book, Award, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SessionList from "@/components/SessionList";
import UpcomingSessions from "@/components/UpcomingSessions";
import Navigation from "@/components/Navigation";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [view, setView] = useState("upcoming");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
            <p className="text-gray-600 mt-1">Manage your learning journey</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available Credits</p>
                <h3 className="text-2xl font-bold text-primary">120</h3>
              </div>
              <Award className="h-8 w-8 text-primary" />
            </div>
            <Button
              variant="link"
              className="mt-4 p-0"
              onClick={() => navigate("/view-credits")}
            >
              View Details →
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">My Sessions</p>
                <h3 className="text-2xl font-bold text-primary">5</h3>
              </div>
              <Book className="h-8 w-8 text-primary" />
            </div>
            <Button
              variant="link"
              className="mt-4 p-0"
              onClick={() => setView("sessions")}
            >
              View All →
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Upcoming Sessions</p>
                <h3 className="text-2xl font-bold text-primary">3</h3>
              </div>
              <CalendarIcon className="h-8 w-8 text-primary" />
            </div>
            <Button
              variant="link"
              className="mt-4 p-0"
              onClick={() => setView("upcoming")}
            >
              View Schedule →
            </Button>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="space-x-2">
              <Button
                variant={view === "upcoming" ? "default" : "outline"}
                onClick={() => setView("upcoming")}
              >
                Upcoming Sessions
              </Button>
              <Button
                variant={view === "sessions" ? "default" : "outline"}
                onClick={() => setView("sessions")}
              >
                My Sessions
              </Button>
            </div>
            <Button onClick={() => navigate("/offer-session")}>
              Offer New Session
            </Button>
          </div>

          {view === "upcoming" ? <UpcomingSessions /> : <SessionList />}
        </div>
      </main>
    </div>
  );
}
