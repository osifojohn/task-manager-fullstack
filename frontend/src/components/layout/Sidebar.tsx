'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Tasks', href: '/tasks', icon: '📋' },
  { name: 'Analytics', href: '/analytics', icon: '📈' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r p-4 transition-transform duration-300 transform',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:block'
      )}
    >
      {/* Close button (visible only on small screens) */}
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h2 className="text-xl font-bold">TaskFlow</h2>
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-2 p-2 rounded hover:bg-gray-100',
              pathname === item.href ? 'bg-gray-100 font-semibold' : ''
            )}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-10 border-t pt-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-4 text-red-500 hover:underline block"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};
