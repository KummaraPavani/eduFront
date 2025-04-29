
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SessionList() {
  // Mock data - in a real app, this would come from your backend
  const sessions = [
    {
      id: 1,
      title: "Introduction to React",
      description: "Learn the basics of React development",
      date: "2024-05-01",
      time: "14:00",
      duration: 60,
      participants: 3,
      maxParticipants: 5,
      category: "technology"
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      description: "Understanding core marketing concepts",
      date: "2024-05-03",
      time: "15:30",
      duration: 90,
      participants: 4,
      maxParticipants: 8,
      category: "business"
    }
  ];

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
              <p className="text-gray-600 mb-4">{session.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(session.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {session.time} ({session.duration} min)
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {session.participants}/{session.maxParticipants}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
