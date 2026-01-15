import type { Task, TaskStatus } from '../../types/task';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const Column = ({ title, tasks, status, onStatusChange }: ColumnProps) => {
  return (
    <div className="bg-blue-200 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center px-2">
        <div className='flex gap-2'>
          <h2 className="font-bold text-lg">
            {title}
            <span className="hidden">{status}</span>
          </h2>
          <button className="font-bold text-lg text-gray-500 text-center hover:text-blue-700 cursor-pointer">
            +
          </button>
        </div>
        <span className="bg-blue-500 px-2.5 py-0.5 rounded-full text-xs font-bold text-white">
          {tasks.length}
        </span>
      </div>
      
      <div className="flex flex-col gap-3 min-h-[150px]">
        {tasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onStatusChange={onStatusChange} 
          />
        ))}
        {tasks.length === 0 && (
          <div className="border-2 border-dashed border-white rounded-lg py-12 text-center text-sm">
            태스크가 없습니다.
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Column;