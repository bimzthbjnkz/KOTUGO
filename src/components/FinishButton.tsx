// FinishButton.tsx
import React from 'react';
import BaseButton from './BaseButton';

interface FinishButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const FinishButton: React.FC<FinishButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className="bg-green-500 text-white hover:bg-green-600"
    >
      Selesai
    </BaseButton>
  );
};

export default FinishButton;