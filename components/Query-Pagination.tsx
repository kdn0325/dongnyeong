"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "./ui/pagination";

interface QueryPaginationProps {
  totalPages: number;
  className?: string;
}

export function QueryPagination({
  totalPages,
  className,
}: QueryPaginationProps) {
  // 현재 경로
  const pathname = usePathname();
  // 현재 URL의 쿼리스트링 파싱
  const searchParams = useSearchParams();
  // 현재 페이지 번호 (쿼리스트링에서 없으면 1페이지)
  const currentPage = Number(searchParams.get("page")) || 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  // 특정 페이지 번호에 대한 URL 생성
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const siblingsCount = 1; // 현재 페이지를 중심으로 양쪽 몇 개를 보여줄지
  const startPage = Math.max(currentPage - siblingsCount, 1);
  const endPage = Math.min(currentPage + siblingsCount, totalPages);

  return (
    <Pagination className={className}>
      <PaginationContent>
        {prevPage >= 1 ? (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(prevPage)} />
          </PaginationItem>
        ) : null}

        {/* 시작 페이지가 1보다 크면 1번 페이지와 생략 기호 추가 */}
        {startPage > 1 && (
          <>
            <PaginationItem className="hidden sm:inline-block">
              <PaginationLink
                isActive={currentPage === 1}
                href={createPageURL(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem className="hidden sm:inline-block">
                <span className="px-2 text-muted-foreground">...</span>
              </PaginationItem>
            )}
          </>
        )}

        {/* 총 페이지 수 만큼 빈 문자열 배열 생성 */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const page = startPage + index;
          return (
            <PaginationItem
              className="hidden sm:inline-block"
              key={`page-button-${page}`}
            >
              <PaginationLink
                isActive={currentPage === page} // 현재 페이지 여부 체크하기
                href={createPageURL(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* 끝 페이지가 totalPages보다 작으면 생략 기호와 마지막 페이지 추가 */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem className="hidden sm:inline-block">
                <span className="px-2 text-muted-foreground">...</span>
              </PaginationItem>
            )}
            <PaginationItem className="hidden sm:inline-block">
              <PaginationLink
                isActive={currentPage === totalPages}
                href={createPageURL(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {nextPage <= totalPages ? (
          <PaginationItem>
            <PaginationNext href={createPageURL(nextPage)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
