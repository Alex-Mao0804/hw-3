import styles from "./Pagination.module.scss";
import ArrowSideIcon from "@/components/icons/ArrowSideIcon";
import clsx from "clsx";
import Button from "@/components/Button";
import { useCallback, useMemo } from "react";

type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

const ELLIPSIS = "...";
const VISIBLE_PAGES = 3;
const MAX_VISIBLE_PAGES = 4;
const Pagination: React.FC<TPaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const paginationGroup = useMemo(() => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (Number(currentPage) <= VISIBLE_PAGES) {
      return [1, 2, 3, ELLIPSIS, totalPages];
    }

    if (Number(currentPage) >= totalPages - (VISIBLE_PAGES - 1)) {
      return [1, ELLIPSIS, totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      ELLIPSIS,
      Number(currentPage) - 1,
      Number(currentPage),
      Number(currentPage) + 1,
      ELLIPSIS,
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const changePage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      const pageNumber = Number(target.textContent);
      if (!isNaN(pageNumber)) {
        goToPage(pageNumber);
      }
    },
    [goToPage],
  );

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button}
        disabled={Number(currentPage) === 1 || totalPages === 0}
        onClick={() => goToPage(Number(currentPage) - 1)}
      >
        <ArrowSideIcon />
      </button>
      <div className={styles.pagination__button_group}>
        {paginationGroup.map((item, index) => (
          <Button
            key={index}
            onClick={changePage}
            className={clsx(
              styles.pagination__button_ciffer,
              Number(currentPage) !== item &&
                styles.pagination__button_noActive,
            )}
            disabled={item === ELLIPSIS}
          >
            {item}
          </Button>
        ))}
      </div>
      <button
        className={styles.pagination__button}
        disabled={Number(currentPage) === totalPages || totalPages === 0}
        onClick={() => goToPage(Number(currentPage) + 1)}
      >
        <ArrowSideIcon />
      </button>
    </div>
  );
};

export default Pagination;
