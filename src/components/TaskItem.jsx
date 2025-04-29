
import React, { useState } from "react";
import { useTask } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Plus, Check, X, Edit2, Trash2 } from "lucide-react";
import TaskForm from "./TaskForm";

export default function TaskItem({ task }) {
  const { tasks, updateTask, deleteTask, toggleTaskCompletion } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const subtasks = tasks.filter(t => t.parentTaskId === task.id);

  const priorityColors = {
    1: "border-gray-300 bg-gray-50",
    2: "border-blue-300 bg-blue-50",
    3: "border-green-300 bg-green-50",
    4: "border-yellow-300 bg-yellow-50",
    5: "border-red-300 bg-red-50"
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        task-card 
        ${task.completed ? 'opacity-70' : ''} 
        ${priorityColors[task.weight]}
        border-l-4 rounded-lg shadow-sm hover:shadow-md 
        transition-all duration-200
        mb-4 p-4
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Button
            variant="ghost"
            size="sm"
            className={`
              rounded-full w-6 h-6 p-0 
              ${task.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}
            `}
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.completed ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
          
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              <span className="flex items-center gap-1">
                Priority: {task.weight}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowSubtaskForm(true)}
          >
            <Plus className="h-4 w-4" />
            <span className="ml-1">Subtask</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700"
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {subtasks.length > 0 && (
        <div className="mt-4 pl-6 border-l border-gray-200">
          {subtasks.map(subtask => (
            <TaskItem key={subtask.id} task={subtask} />
          ))}
        </div>
      )}

      {showSubtaskForm && (
        <TaskForm
          parentTaskId={task.id}
          onClose={() => setShowSubtaskForm(false)}
        />
      )}

      {isEditing && (
        <TaskForm
          task={task}
          onClose={() => setIsEditing(false)}
        />
      )}
    </motion.div>
  );
}
