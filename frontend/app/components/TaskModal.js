'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Input, Textarea, LoadingSpinner } from './ui';
import { taskAPI } from '@/lib/apiServices';

export function TaskModal({ isOpen, onClose, onTaskSaved, editingTask = null }) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, { title, description });
      } else {
        await taskAPI.createTask({ title, description });
      }
      onTaskSaved();
      handleClose();
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Failed to save task' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md"
          >
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingTask ? 'Edit Task' : 'New Task'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Title"
                  placeholder="Task title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={errors.title}
                  autoFocus
                />

                <Textarea
                  label="Description"
                  placeholder="Add details (optional)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {errors.submit && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm"
                  >
                    {errors.submit}
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? <LoadingSpinner /> : 'Save'}
                  </Button>
                  <Button
                    onClick={handleClose}
                    disabled={loading}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
