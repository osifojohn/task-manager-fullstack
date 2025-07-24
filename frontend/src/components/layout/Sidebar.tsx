'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CheckSquare, BarChart3 } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
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
        'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r p-4 transition-transform duration-300 transform flex flex-col justify-between',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:flex'
      )}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">TaskFlow</h2>
          {/* Close button (visible only on small screens) */}
          <button
            onClick={onClose}
            className="text-2xl cursor-pointer md:hidden"
          >
            &times;
          </button>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 p-2 rounded transition-colors duration-200 group',
                  isActive ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
                )}
                onClick={onClose}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 transition-transform duration-200 group-hover:scale-110',
                    isActive
                      ? 'text-blue-600'
                      : 'text-gray-600 group-hover:text-blue-500'
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t pt-4 mt-auto">
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
          className="mt-4 text-red-500 cursor-pointer hover:underline block"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};
