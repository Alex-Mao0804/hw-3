import styles from "./Pagination.module.scss";
import ArrowSideIcon from "@components/icons/ArrowSideIcon";
import clsx from "clsx";
import Button from "@components/Button";
import { memo, useCallback, useMemo } from "react";

type TPaginationProps = {
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
};

const ELLIPSIS = "...";
const VISIBLE_PAGES = 3;

const Pagination: React.FC<TPaginationProps> = memo(
  ({ pageCount, page, setPage }) => {
    const handlePageChange = useCallback(
      (newPage: number) => {
        if (newPage > pageCount || newPage < 1) return;
        setPage(newPage);
      },
      [pageCount, setPage],
    );

    const decrementPage = useCallback(() => {
      handlePageChange(page - 1);
    }, [handlePageChange, page]);

    const incrementPage = useCallback(() => {
      handlePageChange(page + 1);
    }, [handlePageChange, page]);

    const paginationGroup = useMemo(() => {
      if (pageCount <= 4)
        return Array.from({ length: pageCount }, (_, i) => i + 1);
      if (page <= VISIBLE_PAGES) return [1, 2, 3, ELLIPSIS, pageCount];
      if (page >= pageCount - (VISIBLE_PAGES - 1))
        return [1, ELLIPSIS, pageCount - 2, pageCount - 1, pageCount];
      return [1, ELLIPSIS, page - 1, page, page + 1, ELLIPSIS, pageCount];
    }, [page, pageCount]);

    const changePage = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.currentTarget;
        const pageNumber = Number(target.textContent);
        if (!isNaN(pageNumber)) setPage(pageNumber);
      },
      [setPage],
    );

    return (
      <div className={styles.pagination}>
        <button
          className={styles.pagination__button}
          disabled={page === 1}
          onClick={decrementPage}
        >
          <ArrowSideIcon />
        </button>
        <div>
          {paginationGroup.map((item, index) => (
            <Button
              key={index}
              onClick={changePage}
              className={clsx(
                styles.pagination__button_group,
                page !== item && styles.pagination__button_noActive,
              )}
              disabled={item === ELLIPSIS}
            >
              {item}
            </Button>
          ))}
        </div>
        <button
          className={styles.pagination__button}
          disabled={page === pageCount}
          onClick={incrementPage}
        >
          <ArrowSideIcon />
        </button>
      </div>
    );
  },
);

export default Pagination;
