'use client';

import { ProtectedRoute } from '@/lib/ProtectedRoute';
import { Sidebar } from '@/app/components/Sidebar';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto"
        >
          <div className="p-8">
            {children}
          </div>
        </motion.main>
      </div>
    </ProtectedRoute>
  );
}
