import type { Task } from '../../types/task';
import { useState } from 'react';
import type { TaskPriority, TaskStatus } from '../../types/task';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, desciption:string, priority: TaskPriority, status: TaskStatus) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  editingTask: Task | null;
  initialStatus: TaskStatus;
}

const TaskModal = ({ isOpen, onClose, onAdd, onUpdate, onDelete, editingTask, initialStatus }: Props) => {
  const [isReadOnly, setIsReadOnly] = useState(!!editingTask);
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(editingTask?.priority || 'medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
        alert('제목은 필수 입력 사항입니다.');
        return;
    }
    if (editingTask) {
      onUpdate(editingTask.id, { title, description, priority });
    } else {
      onAdd(title, description, priority, initialStatus);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold mb-4">
          {!editingTask ? `${initialStatus} 추가` : isReadOnly ? '태스크 상세' : '태스크 수정'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
            <input
              readOnly={isReadOnly}
              className={`w-full border rounded-lg p-2 outline-none ${isReadOnly ? 'bg-gray-50 border-transparent text-gray-500' : 'focus:ring-2 focus:ring-blue-500'}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="필수 입력"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상세 설명</label>
            <textarea
                readOnly={isReadOnly}
                className={`w-full border rounded-lg p-2 h-24 resize-none outline-none ${isReadOnly ? 'bg-gray-50 border-transparent text-gray-500' : 'focus:ring-2 focus:ring-blue-500'}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="선택 입력"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
            <select
              disabled={isReadOnly}
              className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-50 border-transparent text-gray-500' : ''}`}
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex justify-between items-center mt-4">
            {editingTask && isReadOnly ? (
              <>
                <button 
                  type="button" 
                  onClick={() => { if(confirm('정말 삭제하시겠습니까?')) { onDelete(editingTask.id); onClose(); } }}
                  className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg font-bold transition-colors cursor-pointer"
                >
                  삭제하기
                </button>
                <div className="flex gap-2">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 rounded-lg hover:bg-gray-200 cursor-pointer">닫기</button>
                  <button type="button" onClick={() => setIsReadOnly(false)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold cursor-pointer">수정하기</button>
                </div>
              </>
            ) : (
              <div className="flex justify-end gap-2 w-full">
                <button type="button" onClick={() => editingTask ? setIsReadOnly(true) : onClose()} className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-200 cursor-pointer">취소</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold cursor-pointer">
                  {editingTask ? '수정하기' : '추가하기'}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;