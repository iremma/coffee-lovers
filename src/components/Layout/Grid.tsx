import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'sm' | 'md' | 'lg';
}

const Grid: React.FC<GridProps> = ({ 
  children, 
  className = '', 
  cols = 1,
  gap = 'md'
}) => {
  const getColsClass = () => {
    switch (cols) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
      case 6: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      case 12: return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12';
      default: return 'grid-cols-1';
    }
  };

  const getGapClass = () => {
    switch (gap) {
      case 'none': return 'gap-0';
      case 'sm': return 'gap-2 md:gap-4';
      case 'md': return 'gap-4 md:gap-6';
      case 'lg': return 'gap-6 md:gap-8';
      default: return 'gap-4 md:gap-6';
    }
  };

  return (
    <div className={`grid ${getColsClass()} ${getGapClass()} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;