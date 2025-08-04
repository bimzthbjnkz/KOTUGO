// NextButton.tsx
import React from 'react';
import BaseButton from './BaseButton';

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 text-white hover:bg-blue-600"
    >
      Lanjut
    </BaseButton>
  );
};

export default NextButton;