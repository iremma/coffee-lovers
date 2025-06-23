'use client';

import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className = '' }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Smooth scroll to the section
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={`text-dark-green hover:text-primary-green transition-colors duration-300 font-heading font-semibold ${className}`}
    >
      {children}
    </a>
  );
};

export default NavLink;