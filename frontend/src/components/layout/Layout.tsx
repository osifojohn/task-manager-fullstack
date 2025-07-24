'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (only visible when sidebar is open on mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex h-full w-full">
        <div className="flex-1 flex flex-col w-full">
          {/* Mobile Header with toggle */}
          <header className="md:hidden flex items-center justify-between p-4 border-b z-30 relative bg-white">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-2xl cursor-pointer"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold">TaskFlow</h1>
          </header>

          <main className="flex-1 overflow-auto p-4 bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};
