import { useState } from 'react';
import type { Task, TaskStatus, TaskPriority } from '../types/task';
import { INITIAL_TASKS } from '../constants/initialData';

const STORAGE_KEY = 'synclife_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return INITIAL_TASKS;

    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch {
        return INITIAL_TASKS;
      }
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
    return INITIAL_TASKS;
  });

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    const updated = tasks.map((task) =>
      task.id === id 
        ? { ...task, status, updatedAt: new Date().toISOString() } 
        : task
    );
    saveTasks(updated);
  };

  const addTask = (title: string, description: string, priority: TaskPriority, status: TaskStatus) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      status,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveTasks([newTask, ...tasks]);
  };

  return { tasks, updateTaskStatus, addTask };
};