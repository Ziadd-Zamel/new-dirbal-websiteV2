import { cn } from '@/lib/utils';
import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  color = 'bg-gray-300',
  thickness = 'h-[1px]',
  className,
}) => {
  const baseStyles = orientation === 'horizontal' ? 'w-full' : 'h-full';
  const dynamicStyles = cn(baseStyles, color, thickness, className);

  return <div className={dynamicStyles} />;
};

export default Divider;
