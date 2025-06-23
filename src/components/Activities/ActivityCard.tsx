'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/lib/data/activities';

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
  // Icons mapping (using emoji as placeholders, would use actual SVG icons in production)
  const iconMap: Record<string, string> = {
    'tea-cup': '🍵',
    'yoga': '🧘',
    'bakery': '🍰',
    'music': '🎵',
  };
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full hover-lift"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-32 bg-primary-green flex items-center justify-center">
        <span className="text-6xl" role="img" aria-label={activity.title}>
          {iconMap[activity.icon]}
        </span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-heading font-bold text-dark-green mb-3">
          {activity.title}
        </h3>
        
        <p className="text-gray-700">
          {activity.description}
        </p>
        
        <motion.div 
          className="mt-4 h-1 bg-light-green rounded"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

export default ActivityCard;