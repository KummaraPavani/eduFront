
import React, { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function TaskForm({ parentTaskId, onClose }) {
  const { addTask } = useTask();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split('T')[0],
    weight: 3,
    parentTaskId,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {parentTaskId ? "Add Subtask" : "Add Task"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              required
              placeholder="Enter task title"
              value={task.title}
              onChange={e => setTask({
                ...task,
                title: e.target.value
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter task description"
              value={task.description}
              onChange={e => setTask({
                ...task,
                description: e.target.value
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              required
              value={task.dueDate}
              onChange={e => setTask({
                ...task,
                dueDate: e.target.value
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Priority (1-5)</Label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((weight) => (
                <Button
                  key={weight}
                  type="button"
                  variant={task.weight === weight ? "default" : "outline"}
                  className={`w-10 h-10 rounded-full ${
                    task.weight === weight 
                      ? "bg-primary text-white" 
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => setTask({ ...task, weight })}
                >
                  {weight}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
