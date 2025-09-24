'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/Layout';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Enhanced parallax effect values
  const backgroundY = useTransform(scrollY, [0, 500], ['0%', '50%']);
  const backgroundScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 500], ['0%', '25%']);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const rotateX = useTransform(scrollY, [0, 500], [0, 10]);
  
  // Floating animation for decorative elements
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  // Handle button hover animation
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: isMounted ? backgroundY : 0,
          scale: isMounted ? backgroundScale : 1
        }}
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-[url('/coffee-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-brown/80 to-dark-brown/90" />
        
        {/* Enhanced decorative elements with animations */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-light-brown/20 blur-xl"
          animate={floatingAnimation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-accent-orange/10 blur-xl"
          animate={{
            ...floatingAnimation,
            y: [0, -20, 0]
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.8, delay: 0.3 }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-light-brown/15 blur-lg"
          animate={{
            ...floatingAnimation,
            y: [0, -10, 0]
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 5, delay: 0.5 }}
        />
      </motion.div>
      
      <Container className="relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          style={{ 
            y: isMounted ? textY : 0,
            opacity: isMounted ? opacity : 1,
            rotateX: isMounted ? rotateX : 0
          }}
        >
          <motion.h1 
            className="text-white text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <span className="inline-block">
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Coffee
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Lovers
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Meet
              </motion.span>{" "}
              <motion.span 
                className="inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Up!
              </motion.span>
            </span>
          </motion.h1>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p 
              className="text-cream text-xl md:text-2xl font-heading"
              whileHover={{ scale: 1.05, color: "#FFFFFF" }}
              transition={{ duration: 0.2 }}
            >
              June 16th, 10 am BST
            </motion.p>
            <motion.p 
              className="text-cream text-lg md:text-xl mt-2"
              whileHover={{ scale: 1.05, color: "#FFFFFF" }}
              transition={{ duration: 0.2 }}
            >
              Bermondsey Street, London
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button 
              className="btn btn-primary text-lg px-8 py-4 shadow-lg relative overflow-hidden group"
              onClick={() => document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 105, 180, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ boxShadow: "0 4px 6px -1px rgba(255, 105, 180, 0.2)" }}
            >
              {/* Enhanced button background animations */}
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Particle effects on hover */}
              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.span 
                      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 0], 
                        opacity: [0, 1, 0],
                        y: [0, -20],
                        x: [0, 10]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.span 
                      className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-white"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: [0, 1.5, 0], 
                        opacity: [0, 1, 0],
                        y: [0, -15],
                        x: [0, -10]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                  </>
                )}
              </AnimatePresence>
              
              <span className="relative z-10">Get Your Ticket</span>
              
              {/* Subtle pulsing effect */}
              <motion.span 
                className="absolute inset-0 rounded-lg bg-accent-pink/0"
                animate={{ 
                  boxShadow: isHovered 
                    ? ["0 0 0 0 rgba(255, 105, 180, 0.7)", "0 0 0 10px rgba(255, 105, 180, 0)"] 
                    : "0 0 0 0 rgba(255, 105, 180, 0)"
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: isHovered ? Infinity : 0,
                  repeatType: "loop"
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.p 
          className="text-white text-sm mb-2 font-light tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Scroll Down
        </motion.p>
        <motion.div 
          className="w-6 h-10 border-2 border-white rounded-full flex justify-center relative"
          whileHover={{ scale: 1.1 }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-white rounded-full mt-2"
            animate={{ 
              y: [0, 4, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute -inset-1 rounded-full border border-white/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeOut",
              repeatDelay: 0.5
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;