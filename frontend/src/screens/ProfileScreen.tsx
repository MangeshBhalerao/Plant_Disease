import React from 'react';
import { motion } from 'motion/react';
import { User, ArrowLeft, Mail, MapPin, Calendar, Leaf, Settings, Bell, Shield, Sparkles, ChevronRight } from 'lucide-react';

export const ProfileScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 sm:space-y-6 max-w-2xl mx-auto"
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -3 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-1.5 text-on-surface-muted hover:text-primary transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </motion.button>

      {/* Profile Header Card */}
      <div className="card-soft p-5 sm:p-7 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-primary/6 via-secondary/4 to-transparent rounded-t-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-3 ring-white shadow-md">
              <img 
                src="https://img.freepik.com/free-vector/farmer-using-technology-digital-agriculture_53876-113813.jpg?semt=ais_hybrid&w=740&q=80" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-lg flex items-center justify-center border-2 border-white shadow-sm">
              <Leaf className="w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="text-center sm:text-left pb-0 sm:pb-0.5 flex-grow">
            <h2 className="font-headline text-xl sm:text-2xl font-extrabold text-on-surface tracking-tight">Garden Explorer</h2>
            <p className="text-on-surface-muted text-xs sm:text-sm mt-0.5">Plant enthusiast since 2021</p>
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 bg-primary/8 text-primary rounded-full mt-1.5">
              <Sparkles className="w-2.5 h-2.5" />
              Pro Member
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mt-5 sm:mt-6 relative z-10">
          {[
            { value: '47', label: 'Scanned' },
            { value: '12', label: 'Saved' },
            { value: '98%', label: 'Healthy' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl bg-surface-container">
              <p className="font-headline font-extrabold text-lg sm:text-xl text-gradient">{stat.value}</p>
              <p className="text-[9px] sm:text-[10px] text-on-surface-muted font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="card-soft p-4 sm:p-5 space-y-1">
        <h3 className="font-headline font-bold text-sm text-on-surface mb-2 px-1">Personal Info</h3>
        {[
          { icon: Mail, label: 'Email', value: 'garden.explorer@email.com' },
          { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
          { icon: Calendar, label: 'Member Since', value: 'March 2021' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 px-1 border-b border-outline-variant/50 last:border-b-0">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
              <item.icon className="w-3.5 h-3.5 text-on-surface-muted" />
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-[9px] text-on-surface-muted uppercase tracking-wider font-medium">{item.label}</p>
              <p className="text-sm text-on-surface truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Settings links */}
      <div className="card-soft overflow-hidden">
        {[
          { icon: Settings, label: 'App Settings', desc: 'Notifications, themes, language' },
          { icon: Bell, label: 'Notifications', desc: 'Push, email, reminders' },
          { icon: Shield, label: 'Privacy & Security', desc: 'Data, account, permissions' },
        ].map((item, i) => (
          <button
            key={i}
            className="flex items-center gap-3 px-4 sm:px-5 py-3.5 w-full text-left border-b border-outline-variant/30 last:border-b-0 group hover:bg-primary/3 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-surface-container group-hover:bg-primary/8 flex items-center justify-center shrink-0 transition-colors">
              <item.icon className="w-4 h-4 text-on-surface-muted group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-semibold text-on-surface">{item.label}</p>
              <p className="text-xs text-on-surface-muted truncate">{item.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-on-surface-muted/25 group-hover:text-primary/40 transition-colors shrink-0" />
          </button>
        ))}
      </div>

      <div className="h-2" />
    </motion.div>
  );
};
