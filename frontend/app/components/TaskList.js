'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, LoadingSpinner, EmptyState, Input } from './ui';
import { TaskModal } from './TaskModal';
import { taskAPI } from '@/lib/apiServices';

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks(search);
      setTasks(response.data.tasks);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(debounce);
  }, [search]);

  const handleDeleteTask = async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleToggleComplete = async (task) => {
    try {
      await taskAPI.updateTask(task._id, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? { ...t, completed: !t.completed } : t));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-3">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={() => {
              setEditingTask(null);
              setModalOpen(true);
            }}
          >
            + New Task
          </Button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {tasks.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No tasks yet"
            description="Create your first task to get started"
          />
        ) : (
          <motion.div className="space-y-2">
            {tasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="flex items-start gap-4 hover:shadow-soft-lg transition-shadow">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="mt-1 cursor-pointer"
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEditTask(task)}
                      variant="secondary"
                      className="px-3 py-1 text-sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteTask(task._id)}
                      variant="danger"
                      className="px-3 py-1 text-sm"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingTask(null);
        }}
        onTaskSaved={fetchTasks}
        editingTask={editingTask}
      />
    </>
  );
}
