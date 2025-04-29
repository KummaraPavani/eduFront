
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { addDays, isToday, isTomorrow } from "date-fns";

const TaskContext = createContext({});

export function useTask() {
  return useContext(TaskContext);
}

export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`tasks_${user.id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const checkDueTasks = () => {
        const dueTasks = tasks.filter(task => {
          const dueDate = new Date(task.dueDate);
          return isToday(dueDate) || isTomorrow(dueDate);
        });

        dueTasks.forEach(task => {
          const dueDate = new Date(task.dueDate);
          const message = isToday(dueDate)
            ? "due today"
            : "due tomorrow";

          toast({
            title: "Task Reminder",
            description: `"${task.title}" is ${message}!`,
          });
        });
      };

      checkDueTasks();
      const interval = setInterval(checkDueTasks, 1800000); // Check every 30 minutes

      return () => clearInterval(interval);
    }
  }, [tasks, user, toast]);

  const calculatePriority = (weight, dueDate) => {
    const daysUntilDue = Math.max(
      0,
      Math.ceil(
        (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24)
      )
    );
    return weight * (1 / (daysUntilDue + 1));
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user.id}`, JSON.stringify(newTasks));
    toast({
      title: "Success",
      description: "Task added successfully",
    });
  };

  const updateTask = (taskId, updatedTask) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user.id}`, JSON.stringify(newTasks));
    toast({
      title: "Success",
      description: "Task updated successfully",
    });
  };

  const toggleTaskCompletion = (taskId) => {
    const newTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user.id}`, JSON.stringify(newTasks));
    const task = newTasks.find(t => t.id === taskId);
    toast({
      title: "Success",
      description: `Task marked as ${task.completed ? 'completed' : 'incomplete'}`,
    });
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId && task.parentTaskId !== taskId);
    setTasks(newTasks);
    localStorage.setItem(`tasks_${user.id}`, JSON.stringify(newTasks));
    toast({
      title: "Success",
      description: "Task deleted successfully",
    });
  };

  const getTopUrgentTasks = () => {
    return [...tasks]
      .filter(task => !task.completed)
      .sort((a, b) => {
        const priorityA = calculatePriority(a.weight, a.dueDate);
        const priorityB = calculatePriority(b.weight, b.dueDate);
        return priorityB - priorityA;
      })
      .slice(0, 5);
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTopUrgentTasks,
    calculatePriority,
    toggleTaskCompletion,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
