'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isEventPassed, setIsEventPassed] = useState<boolean>(false);
  
  useEffect(() => {
    // Function to calculate time left
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsEventPassed(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Set up interval for real-time updates
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  // Format numbers to always have two digits
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  
  // Animation variants for number changes
  const numberVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  if (isEventPassed) {
    return (
      <motion.div 
        className="bg-primary-green/10 p-8 rounded-lg text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-heading font-bold text-primary-green mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          The Event Has Ended
        </motion.h2>
        <motion.p 
          className="text-lg text-dark-green"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Thank you to everyone who attended! Check back soon for photos and highlights.
        </motion.p>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="py-12 md:py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-heading font-bold text-center mb-8 text-primary-green"
        variants={itemVariants}
      >
        Event Countdown
      </motion.h2>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-4 md:gap-8"
        variants={itemVariants}
      >
        {/* Days */}
        <motion.div 
          className="countdown-item"
          variants={itemVariants}
        >
          <div className="relative w-20 h-24 md:w-28 md:h-32 bg-primary-green rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <motion.div
              key={`days-${timeLeft.days}`}
              className="absolute text-4xl md:text-5xl font-heading font-bold text-white"
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {formatNumber(timeLeft.days)}
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/10"></div>
          </div>
          <p className="text-center mt-2 text-dark-green font-medium">Days</p>
        </motion.div>
        
        {/* Hours */}
        <motion.div 
          className="countdown-item"
          variants={itemVariants}
        >
          <div className="relative w-20 h-24 md:w-28 md:h-32 bg-primary-green rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <motion.div
              key={`hours-${timeLeft.hours}`}
              className="absolute text-4xl md:text-5xl font-heading font-bold text-white"
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {formatNumber(timeLeft.hours)}
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/10"></div>
          </div>
          <p className="text-center mt-2 text-dark-green font-medium">Hours</p>
        </motion.div>
        
        {/* Minutes */}
        <motion.div 
          className="countdown-item"
          variants={itemVariants}
        >
          <div className="relative w-20 h-24 md:w-28 md:h-32 bg-primary-green rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <motion.div
              key={`minutes-${timeLeft.minutes}`}
              className="absolute text-4xl md:text-5xl font-heading font-bold text-white"
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {formatNumber(timeLeft.minutes)}
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/10"></div>
          </div>
          <p className="text-center mt-2 text-dark-green font-medium">Minutes</p>
        </motion.div>
        
        {/* Seconds */}
        <motion.div 
          className="countdown-item"
          variants={itemVariants}
        >
          <div className="relative w-20 h-24 md:w-28 md:h-32 bg-primary-green rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <motion.div
              key={`seconds-${timeLeft.seconds}`}
              className="absolute text-4xl md:text-5xl font-heading font-bold text-white"
              variants={numberVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {formatNumber(timeLeft.seconds)}
            </motion.div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-black/10"></div>
          </div>
          <p className="text-center mt-2 text-dark-green font-medium">Seconds</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Countdown;