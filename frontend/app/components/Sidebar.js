'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Tasks', href: '/dashboard', icon: '✓' },
    { label: 'Profile', href: '/dashboard/profile', icon: '👤' },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen flex flex-col shadow-lg"
    >
      <div className="p-6 border-b border-gray-700">
        <div className="text-2xl font-bold">TaskHub</div>
        <p className="text-sm text-gray-400 mt-1">Manage Your Tasks</p>
      </div>

      {user && (
        <div className="p-4 bg-gray-800">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  );
}
