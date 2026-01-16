import type { Task } from '../../types/task';
import deleteIcon from "../../assets/delete.png";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
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
    <div draggable onDragStart={handleDragStart} className="relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow hover:bg-blue-100 active:cursor-grabbing cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${color}`}>
          {label}
        </span>
        <span className="text-[11px] text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onDelete(task.id)} className="p-1 hover:bg-red-50 rounded text-red-400">
            <img src={deleteIcon} alt="삭제" className="w-4" />
          </button>
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