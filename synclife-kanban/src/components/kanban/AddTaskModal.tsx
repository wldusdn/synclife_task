import { useState } from 'react';
import type { TaskPriority, TaskStatus } from '../../types/task';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, desciption:string, priority: TaskPriority, status: TaskStatus) => void;
  initialStatus: TaskStatus;
}

const AddTaskModal = ({ isOpen, onClose, onAdd, initialStatus }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        alert('제목은 필수 입력 사항입니다.');
        return;
    }
    const taskDescription = description.trim() || ''; 
    onAdd(title, taskDescription, priority, initialStatus);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">{initialStatus} 추가</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목 (필수)</label>
            <input
              autoFocus
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="할 일을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명 (선택)</label>
            <textarea
                className="w-full border rounded-lg p-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="상세 내용을 입력하세요"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
            <select
              className="w-full border rounded-lg p-2"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">취소</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold">추가하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;