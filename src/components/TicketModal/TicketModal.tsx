'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  quantity: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  quantity?: string;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  // Add focus trap for accessibility
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  // Handle keyboard navigation for accessibility
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Focus trap
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    quantity: 1
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    } else if (formData.quantity > 10) {
      newErrors.quantity = 'Maximum 10 tickets per order';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate payment processing API call
    try {
      // Step 1: Process payment (simulated)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Generate ticket ID
      const ticketId = `MATCHA-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      
      // Step 3: Send confirmation email (simulated)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Payment processed successfully');
      console.log('Ticket ID:', ticketId);
      console.log('Confirmation email sent to:', formData.email);
      
      // Show success state
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setIsSubmitting(false);
        setFormData({ name: '', email: '', quantity: 1 });
      }, 2000);
      
      // Store ticket in localStorage (for demo purposes)
      localStorage.setItem('matchaTicket', JSON.stringify({
        ticketId,
        name: formData.name,
        email: formData.email,
        quantity: formData.quantity,
        totalPrice: formData.quantity * 10,
        purchaseDate: new Date().toISOString(),
        eventDate: '2025-06-16T10:00:00+01:00'
      }));
      
    } catch (error) {
      console.error('Error processing payment:', error);
      setIsSubmitting(false);
      // Here we would handle payment failures with appropriate messaging
    }
  };
  
  const handleAddToCalendar = () => {
    // Create calendar event URL (Google Calendar example)
    const eventTitle = encodeURIComponent('Matcha Lovers Meet Up!');
    const eventLocation = encodeURIComponent('Bermondsey Street, London');
    const eventDescription = encodeURIComponent('Join us for a day of matcha tastings, yoga classes, bakery treats, and live music!');
    const eventStart = encodeURIComponent('20250616T100000');
    const eventEnd = encodeURIComponent('20250616T180000');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${eventStart}/${eventEnd}&details=${eventDescription}&location=${eventLocation}`;
    
    window.open(googleCalendarUrl, '_blank');
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-modal-title"
          >
            <div className="bg-primary-green p-6">
              <div className="flex justify-between items-center">
                <h3 id="ticket-modal-title" className="text-2xl font-heading font-bold text-white">Get Your Ticket</h3>
                <button 
                  onClick={onClose}
                  className="text-white hover:text-cream transition-colors"
                  aria-label="Close ticket modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {!isSuccess ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-medium">Ticket Price:</span>
                      <span className="text-xl font-heading font-bold text-primary-green">£10</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-green w-full"></div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="quantity" className="block text-gray-700 mb-1">Number of Tickets</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="10"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                    <p className="text-gray-500 text-sm mt-1">Total: £{(formData.quantity * 10).toFixed(2)}</p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent-pink text-white py-3 rounded-md font-heading font-bold text-lg hover:bg-opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Purchase Ticket'
                    )}
                  </button>
                </form>
              ) : (
                <motion.div 
                  className="text-center py-6"
                  variants={successVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-gray-800 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">Your ticket has been confirmed. We've sent the details to your email.</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                    <h4 className="font-heading font-bold text-gray-700 mb-2">Ticket Details</h4>
                    <p className="text-sm text-gray-600"><span className="font-medium">Event:</span> Matcha Lovers Meet Up!</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> June 16th, 2025</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Time:</span> 10:00 AM BST</p>
                    <p className="text-sm text-gray-600"><span className="font-medium">Location:</span> Bermondsey Street, London</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleAddToCalendar}
                      className="bg-primary-green text-white py-2 px-4 rounded-md font-medium hover:bg-opacity-90 transition-colors flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Add to Calendar
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;