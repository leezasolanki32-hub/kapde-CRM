import React, { useState } from 'react';
import { Search, Calendar } from "lucide-react";

/* ───────────── New Task Modal ───────────── */
const NewTaskModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    priority: 'Medium',
    dueDate: '',
    description: '',
    assignee: 'John Doe'
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputCls = "w-full border border-[#E2DED6] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition bg-white";
  const labelCls = "block text-[12px] font-semibold text-[#4B4B4F] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DED6]">
          <div>
            <h2 className="text-[18px] font-bold text-[#1C1C1E]">Add New Task</h2>
            <p className="text-[12px] text-[#6B6B70] mt-0.5">Assign a new task to your team</p>
          </div>
          <button onClick={onClose} className="text-[#6B6B70] hover:text-[#1C1C1E] text-[22px] leading-none transition">×</button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">
          <div className="mb-4">
            <label className={labelCls}>Task Title <span className="text-red-500">*</span></label>
            <input name="title" value={form.title} onChange={handle} className={inputCls} placeholder="e.g. Call client for feedback" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Priority</label>
              <select name="priority" value={form.priority} onChange={handle} className={inputCls}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handle} className={inputCls} />
            </div>
          </div>
          <div className="mb-4">
            <label className={labelCls}>Assignee</label>
            <select name="assignee" value={form.assignee} onChange={handle} className={inputCls}>
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Sanjay Malhotra</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea name="description" value={form.description} onChange={handle} rows={3} className={inputCls + " resize-none"} placeholder="What needs to be done?" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2DED6] bg-[#FAFAFA] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-md border border-[#E2DED6] text-[13px] text-[#4B4B4F] hover:bg-[#F3F0EC] transition font-medium">Cancel</button>
          <button 
            onClick={() => {
              if (form.title) {
                onAdd(form);
                onClose();
              }
            }} 
            className="px-6 py-2 rounded-md bg-[#a855f7] text-white text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};


const Tasks = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Prepare Summer Season Quotations', priority: 'High', dueDate: 'Apr 25, 2026', column: 'To Do' },
    { id: 2, title: 'Follow up with Fabric Supplier', priority: 'Medium', dueDate: 'Apr 26, 2026', column: 'In Progress' },
    { id: 3, title: 'Inventory Stock Audit', priority: 'Urgent', dueDate: 'Apr 24, 2026', column: 'Completed' },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), column: 'To Do' }]);
  };

  const moveTask = (id, nextCol) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, column: nextCol } : t));
  };

  const getColTasks = (col) => tasks.filter(t => t.column === col);

  const priorityColors = {
    'Urgent': 'text-red-500 bg-red-50',
    'High': 'text-orange-500 bg-orange-50',
    'Medium': 'text-blue-500 bg-blue-50',
    'Low': 'text-gray-500 bg-gray-50'
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showTaskModal && <NewTaskModal onClose={() => setShowTaskModal(false)} onAdd={addTask} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Task Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="Search tasks..." className="border border-[#E2DED6] rounded-md px-3 py-1.5 pl-8 text-[13px] outline-none focus:border-[#a855f7] bg-white shadow-sm w-[200px]" />
            <span className="absolute left-2.5 top-2 text-[#6B6B70] text-[12px]"><Search size={16} className="inline-block" /></span>
          </div>
          <button onClick={() => setShowTaskModal(true)} className="bg-[#a855f7] text-white px-5 py-2 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#9333ea] transition">+ New Task</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {['To Do', 'In Progress', 'Completed'].map((column) => (
          <div key={column} className="bg-[#FAF8F4] border border-[#E2DED6] rounded-xl p-4 min-h-[400px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#1C1C1E] text-[14px] uppercase tracking-wide">{column}</h3>
              <span className="bg-[#f3e8ff] text-[#a855f7] px-2 py-0.5 rounded text-[11px] font-bold shadow-sm">{getColTasks(column).length}</span>
            </div>
            <div className="flex flex-col gap-3">
              {getColTasks(column).map(task => (
                <div 
                  key={task.id} 
                  className="bg-white border border-[#E2DED6] p-4 rounded-lg shadow-sm hover:border-[#a855f7] transition cursor-pointer group"
                  onClick={() => {
                    const next = column === 'To Do' ? 'In Progress' : column === 'In Progress' ? 'Completed' : 'To Do';
                    moveTask(task.id, next);
                  }}
                >
                  <div className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full inline-block mb-1 ${priorityColors[task.priority] || priorityColors.Medium}`}>
                    {task.priority} Priority
                  </div>
                  <div className="text-[14px] font-bold text-[#1C1C1E] group-hover:text-[#a855f7] transition leading-snug">
                    {task.title}
                  </div>
                  <div className="text-[12px] text-[#6B6B70] mt-1 font-medium flex items-center gap-1">
                    <span><Calendar size={16} className="inline-block" /></span> Due: {task.dueDate || 'No Date'}
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#f0f0f0] flex justify-between items-center">
                    <div className="flex -space-x-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#fce7f3] border-2 border-white shadow-sm flex items-center justify-center text-[8px] font-bold">JD</div>
                    </div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] uppercase">ID #{task.id.toString().slice(-3)}</span>
                  </div>
                </div>
              ))}
              {getColTasks(column).length === 0 && (
                <div className="text-center py-10 text-[#9CA3AF] text-[12px] italic border-2 border-dashed border-[#E2DED6] rounded-xl bg-white/50">
                  No tasks in {column}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
