interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  siblingCount = 1 
}: PaginationProps) {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingCount * 2 + 3; // siblings + first + last + current
    const totalBlocks = totalNumbers + 2; // + 2 dots

    if (totalPages <= totalBlocks) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        for (let i = 1; i <= leftItemCount; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (showLeftDots && !showRightDots) {
        pages.push(1);
        pages.push('...');
        const rightItemCount = 3 + 2 * siblingCount;
        for (let i = totalPages - rightItemCount + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav className="flex items-center space-x-2" aria-label="Pagination">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-10 h-10 rounded-md text-text-dark-body hover:bg-surface-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <span className="material-symbols-outlined text-xl">chevron_left</span>
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${index}`}
              className="inline-flex items-center justify-center w-10 h-10 text-text-dark-body"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`inline-flex items-center justify-center w-10 h-10 rounded-md text-sm font-bold transition-colors ${
              isActive
                ? 'bg-primary/20 text-primary'
                : 'text-text-dark-body hover:bg-surface-dark'
            }`}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-10 h-10 rounded-md text-text-dark-body hover:bg-surface-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <span className="material-symbols-outlined text-xl">chevron_right</span>
      </button>
    </nav>
  );
}

