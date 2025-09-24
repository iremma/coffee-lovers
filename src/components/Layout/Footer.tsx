'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const Footer: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true);
      setContactFormData({ name: '', email: '', message: '' });
    }, 1000);
  };
  
  const faqItems: FAQItem[] = [
    {
      question: 'What is included in the ticket price?',
      answer: 'Your £10 ticket includes entry to the event, access to all coffee tastings, participation in yoga classes, and enjoyment of live music performances throughout the day.'
    },
    {
      question: 'Is the event suitable for coffee beginners?',
      answer: 'Absolutely! The event welcomes coffee enthusiasts of all levels, from beginners to connoisseurs. Our experts will guide you through the experience.'
    },
    {
      question: 'Are there food options available?',
      answer: 'Yes, the coffee bakery section will offer a variety of coffee-infused treats for purchase. There will also be other food vendors on site.'
    },
    {
      question: 'What should I bring to the yoga sessions?',
      answer: 'We recommend bringing your own yoga mat if you have one. We will have a limited number of mats available to borrow on a first-come, first-served basis.'
    }
  ];
  
  return (
    <footer className="bg-dark-brown text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Location Section */}
          <div className="footer-section">
            <h3 className="text-xl font-heading font-bold mb-4">Location</h3>
            <p className="mb-4">Bermondsey Street<br />London, UK</p>
            
            {/* Map */}
            <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5463608169474!2d-0.08367492341297924!3d51.50006331882416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876035159bb13c5%3A0xa61e28267c3563ac!2sBermondsey%20St%2C%20London!5e0!3m2!1sen!2suk!4v1687881234567!5m2!1sen!2suk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location"
              ></iframe>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="footer-section">
            <h3 className="text-xl font-heading font-bold mb-4">FAQ</h3>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-white/20 pb-2">
                  <button 
                    className="flex justify-between items-center w-full text-left py-2"
                    onClick={() => toggleQuestion(index)}
                  >
                    <span className="font-medium">{item.question}</span>
                    <span className="transform transition-transform duration-300">
                      {activeQuestion === index ? '−' : '+'}
                    </span>
                  </button>
                  
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeQuestion === index ? 'auto' : 0,
                      opacity: activeQuestion === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="py-2 text-cream/90">{item.answer}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="text-xl font-heading font-bold mb-4">Contact Us</h3>
            
            {!formSubmitted ? (
              <form onSubmit={handleContactFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="block text-sm mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={contactFormData.name}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-light-brown"
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="block text-sm mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-light-brown"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-sm mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4}
                    value={contactFormData.message}
                    onChange={handleContactFormChange}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-light-brown"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="bg-light-brown text-dark-brown font-medium py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-light-brown/20 p-4 rounded-md"
              >
                <p className="font-medium mb-2">Thank you for your message!</p>
                <p>We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-light-brown hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} Coffee Lovers Meet Up! All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;