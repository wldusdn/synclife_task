import type { Task } from './types/task';
import { useTasks } from './hooks/useTasks';
import Column from './components/kanban/Column';
import { useState } from 'react';
import TaskModal from './components/kanban/TaskModal';
import type { TaskStatus } from './types/task';

const KanbanBoard = () => {
  const { tasks, updateTaskStatus, addTask, deleteTask, editTask } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<TaskStatus>('todo');

  const openModal = (status: TaskStatus) => {
    setTargetStatus(status);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <Column 
          title="To Do" 
          tasks={todoTasks} 
          status="todo" 
          onStatusChange={updateTaskStatus}
          onAddClick={() => openModal('todo')}
          onDelete = {deleteTask}
          onEdit={handleEditClick}
        />
        <Column 
          title="In Progress" 
          tasks={inProgressTasks} 
          status="in-progress" 
          onStatusChange={updateTaskStatus}
          onAddClick={() => openModal('in-progress')}
          onDelete = {deleteTask}
          onEdit={handleEditClick} 
        />
        <Column 
          title="Done" 
          tasks={doneTasks} 
          status="done" 
          onStatusChange={updateTaskStatus}
          onAddClick={() => openModal('done')}
          onDelete = {deleteTask}
          onEdit={handleEditClick} 
        />
      </main>
      <TaskModal
        key={editingTask?.id || 'new'} 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }} 
        onAdd={addTask}
        onUpdate={editTask}
        editingTask={editingTask}  
        initialStatus={targetStatus} 
      />
    </div>
  );
};

export default KanbanBoard;