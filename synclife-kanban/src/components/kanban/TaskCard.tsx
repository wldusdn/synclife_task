import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const priorityMap = {
    high: { label: 'High', color: 'bg-red-100 text-red-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    low: { label: 'Low', color: 'bg-green-100 text-green-700' },
  };

  const { label, color } = priorityMap[task.priority];

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div draggable onDragStart={handleDragStart} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:bg-blue-100 active:cursor-grabbing cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${color}`}>
          {label}
        </span>
        <span className="text-[11px] text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      <h3 className="font-semibold text-gray-800">
        {task.title}
      </h3>
      {task.description && task.description.trim() !== '' && (
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 break-all">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;