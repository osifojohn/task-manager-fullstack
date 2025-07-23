'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
