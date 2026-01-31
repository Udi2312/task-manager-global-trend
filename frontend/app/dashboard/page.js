'use client';

import { TaskList } from '@/app/components/TaskList';
import { Card } from '@/app/components/ui';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your tasks efficiently</p>

      <Card>
        <TaskList />
      </Card>
    </motion.div>
  );
}
