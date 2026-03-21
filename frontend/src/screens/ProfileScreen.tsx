import React from 'react';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

export const ProfileScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center space-y-4"
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <User className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold">Profile View</h2>
      <p className="text-on-surface-variant">User profile settings and account details would go here.</p>
      <button 
        onClick={onBack}
        className="text-primary font-bold underline"
      >
        Back to Home
      </button>
    </motion.div>
  );
};
