export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChangeAction: (page: number) => void
  siblingCount?: number
}
