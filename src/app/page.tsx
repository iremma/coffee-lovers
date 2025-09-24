'use client';

import React, { useState } from 'react';
import { MainLayout, Section, ScrollReveal, Container } from '@/components/Layout';
import Hero from '@/components/Hero/Hero';
import Countdown from '@/components/Countdown';
import ActivityCard from '@/components/Activities/ActivityCard';
import TicketModal from '@/components/TicketModal/TicketModal';
import { activities } from '@/lib/data/activities';

export default function Home() {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  
  const openTicketModal = () => setIsTicketModalOpen(true);
  const closeTicketModal = () => setIsTicketModalOpen(false);
  
  // Add event listener to the hero button
  React.useEffect(() => {
    const ticketButton = document.querySelector('#hero-ticket-button');
    if (ticketButton) {
      ticketButton.addEventListener('click', openTicketModal);
    }
    
    return () => {
      if (ticketButton) {
        ticketButton.removeEventListener('click', openTicketModal);
      }
    };
  }, []);
  
  return (
    <MainLayout>
      <Hero />
      
      {/* Countdown Section */}
      <Section id="countdown" className="bg-cream py-16">
        <Container>
          <ScrollReveal>
            <Countdown targetDate={new Date('2025-06-16T10:00:00+01:00')} />
          </ScrollReveal>
        </Container>
      </Section>
      
      {/* Activities Section */}
      <Section id="activities" className="bg-light-brown bg-opacity-30 py-16">
        <Container>
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 text-primary-brown">What to Expect</h2>
            <p className="text-center text-dark-brown max-w-2xl mx-auto mb-12">
              Join us for a day filled with coffee experiences, wellness activities, and community connections.
            </p>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {activities.map((activity, index) => (
              <ActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </Container>
      </Section>
      
      {/* Ticket Section */}
      <Section id="tickets" className="bg-cream py-16">
        <Container className="text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-primary-brown">Get Your Tickets</h2>
            <p className="text-dark-brown max-w-2xl mx-auto mb-8">
              Secure your spot at the Coffee Lovers Meet Up! for just £10 per person. Each ticket includes access to all activities, tastings, and performances.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            <button 
              onClick={openTicketModal}
              className="btn btn-primary text-lg px-8 py-4 shadow-lg"
            >
              Purchase Tickets Now
            </button>
          </ScrollReveal>
        </Container>
      </Section>
      
      {/* Ticket Modal */}
      <TicketModal isOpen={isTicketModalOpen} onClose={closeTicketModal} />
    </MainLayout>
  );
}