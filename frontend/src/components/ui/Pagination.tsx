'use client';

import React from 'react';
import { Button } from './Button';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  showInfo?: boolean;
  showLimitSelector?: boolean;
  maxVisiblePages?: number;
  limitOptions?: number[];
  isLoading?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onLimitChange,
  showInfo = true,
  showLimitSelector = false,
  maxVisiblePages = 5,
  limitOptions = [5, 10, 20, 50],
  isLoading = false,
  className = '',
}) => {
  if (totalPages <= 1 && !showLimitSelector) return null;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const PageButton: React.FC<{ page: number; isCurrent?: boolean }> = ({
    page,
    isCurrent,
  }) => (
    <Button
      variant={isCurrent ? 'primary' : 'outline'}
      size="sm"
      onClick={() => handlePageClick(page)}
      disabled={isLoading}
      className={`min-w-[40px] h-10 ${isCurrent ? 'pointer-events-none' : ''}`}
    >
      {page}
    </Button>
  );

  const NavButton: React.FC<{
    onClick: () => void;
    disabled: boolean;
    icon: React.ReactNode;
    ariaLabel: string;
  }> = ({ onClick, disabled, icon, ariaLabel }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled || isLoading}
      className="h-10 px-3"
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Info and Limit Selector Row */}
      {(showInfo || showLimitSelector) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {showInfo && (
            <div className="text-sm text-gray-600 order-2 sm:order-1">
              {totalItems > 0 ? (
                <>
                  Showing <span className="font-medium">{startItem}</span> to{' '}
                  <span className="font-medium">{endItem}</span> of{' '}
                  <span className="font-medium">{totalItems}</span> results
                </>
              ) : (
                'No results found'
              )}
            </div>
          )}

          {showLimitSelector && onLimitChange && (
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <label
                htmlFor="limit-select"
                className="text-sm text-gray-700 whitespace-nowrap"
              >
                Show:
              </label>
              <select
                id="limit-select"
                value={itemsPerPage}
                onChange={(e) => onLimitChange(parseInt(e.target.value, 10))}
                disabled={isLoading}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
              >
                {limitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} per page
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center gap-1">
            {/* First and Previous */}
            <NavButton
              onClick={() => handlePageClick(1)}
              disabled={currentPage === 1}
              ariaLabel="Go to first page"
              icon={<ChevronsLeft className="w-4 h-4" />}
            />

            <NavButton
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              ariaLabel="Go to previous page"
              icon={<ChevronLeft className="w-4 h-4" />}
            />

            {/* Page Numbers */}
            {visiblePages[0] > 1 && (
              <>
                <PageButton page={1} />
                {visiblePages[0] > 2 && (
                  <span className="px-2 py-2 text-gray-400">...</span>
                )}
              </>
            )}

            {visiblePages.map((page) => (
              <PageButton
                key={page}
                page={page}
                isCurrent={page === currentPage}
              />
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages && (
              <>
                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                  <span className="px-2 py-2 text-gray-400">...</span>
                )}
                <PageButton page={totalPages} />
              </>
            )}

            {/* Next and Last */}
            <NavButton
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              ariaLabel="Go to next page"
              icon={<ChevronRight className="w-4 h-4" />}
            />

            <NavButton
              onClick={() => handlePageClick(totalPages)}
              disabled={currentPage === totalPages}
              ariaLabel="Go to last page"
              icon={<ChevronsRight className="w-4 h-4" />}
            />
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            Loading...
          </div>
        </div>
      )}
    </div>
  );
};
