import React from 'react';
import { motion } from 'motion/react';
import { User, ArrowLeft, Mail, MapPin, Calendar, Leaf, Settings, Bell, Shield, Sparkles } from 'lucide-react';

export const ProfileScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8 max-w-2xl mx-auto"
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-on-surface-muted hover:text-primary transition-colors text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </motion.button>

      {/* Profile Header Card */}
      <div className="card-glass p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent rounded-t-3xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-6">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-surface-elevated/80 shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-lg flex items-center justify-center border-2 border-surface-elevated">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          
          <div className="text-center sm:text-left pb-0 sm:pb-1 flex-grow">
            <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">Garden Explorer</h2>
            <p className="text-on-surface-muted text-sm mt-1">Plant enthusiast since 2021</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 bg-gradient-to-r from-primary/15 to-secondary/10 text-primary rounded-full border border-primary/10">
                <Sparkles className="w-3 h-3" />
                Pro Member
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 relative z-10">
          {[
            { value: '47', label: 'Plants Scanned' },
            { value: '12', label: 'Saved Plants' },
            { value: '98%', label: 'Healthy Rate' },
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 sm:p-4 rounded-xl bg-surface-container-low/50">
              <p className="font-headline font-extrabold text-xl sm:text-2xl text-gradient">{stat.value}</p>
              <p className="text-[9px] sm:text-[10px] text-on-surface-muted font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="card-glass p-5 sm:p-6 space-y-4">
        <h3 className="font-headline font-bold text-base text-on-surface">Personal Info</h3>
        {[
          { icon: Mail, label: 'Email', value: 'garden.explorer@email.com' },
          { icon: MapPin, label: 'Location', value: 'Mumbai, India' },
          { icon: Calendar, label: 'Member Since', value: 'March 2021' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-outline-variant last:border-b-0">
            <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-on-surface-muted" />
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-[10px] text-on-surface-muted uppercase tracking-wider font-medium">{item.label}</p>
              <p className="text-sm text-on-surface truncate">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Settings links */}
      <div className="card-glass overflow-hidden">
        {[
          { icon: Settings, label: 'App Settings', desc: 'Notifications, themes, language' },
          { icon: Bell, label: 'Notifications', desc: 'Push, email, reminders' },
          { icon: Shield, label: 'Privacy & Security', desc: 'Data, account, permissions' },
        ].map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
            whileTap={{ scale: 0.99 }}
            className="flex items-center gap-3 px-5 sm:px-6 py-4 w-full text-left border-b border-outline-variant last:border-b-0 group transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container-high group-hover:bg-primary/10 flex items-center justify-center shrink-0 transition-colors">
              <item.icon className="w-5 h-5 text-on-surface-muted group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm font-semibold text-on-surface">{item.label}</p>
              <p className="text-xs text-on-surface-muted truncate">{item.desc}</p>
            </div>
            <div className="text-on-surface-muted/30 group-hover:text-primary/50 transition-colors">
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-4" />
    </motion.div>
  );
};
