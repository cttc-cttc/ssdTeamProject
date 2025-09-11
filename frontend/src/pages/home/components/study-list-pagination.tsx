import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface StudyListPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function StudyListPagination({
  currentPage,
  totalPages,
  onPageChange,
}: StudyListPaginationProps) {
  const maxVisible = 5;

  const pageNumbers = (() => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    while (end - start + 1 < maxVisible && start > 1) start--;
    while (end - start + 1 < maxVisible && end < totalPages) end++;

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  })();

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {/* 처음 페이지 + ... */}
        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onPageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 && <PaginationEllipsis />}
          </>
        )}

        {/* 중간 페이지 */}
        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              className={
                page === currentPage
                  ? "bg-primary dark:bg-primary text-white pointer-events-none"
                  : ""
              }
              onClick={e => {
                e.preventDefault();
                if (page !== currentPage) onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* ... + 마지막 페이지 */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault();
                  onPageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 다음 버튼 */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
