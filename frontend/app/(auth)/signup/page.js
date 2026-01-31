'use client';

import { SignupForm } from '@/app/components/SignupForm';
import { motion } from 'framer-motion';

export default function SignupPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black/30 backdrop-blur-md flex items-center justify-center p-4"
    >
      <SignupForm />
    </motion.div>
  );
}
