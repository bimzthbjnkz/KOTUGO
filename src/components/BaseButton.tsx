import React from 'react';

interface BaseButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-medium text-lg
        transition-all duration-300 transform
        focus:outline-none focus:ring-2 focus:ring-opacity-50
        active:scale-95
        shadow-neomorph
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-neomorph-hover'}
      `}
    >
      {children}
    </button>
  );
};

export default BaseButton;