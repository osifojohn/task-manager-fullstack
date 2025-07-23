'use client';

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex items-center space-x-3">{children}</div>
      )}
    </div>
  );
};
