import styles from "./Pagination.module.scss";
import ArrowSideIcon from "@components/icons/ArrowSideIcon";
import clsx from "clsx";
import Button from "@components/Button";
import { useMemo } from "react";

type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
};

const ELLIPSIS = "...";
const VISIBLE_PAGES = 3;

const Pagination: React.FC<TPaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const paginationGroup = useMemo(() => {
    if (totalPages <= 4)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= VISIBLE_PAGES) return [1, 2, 3, ELLIPSIS, totalPages];
    if (currentPage >= totalPages - (VISIBLE_PAGES - 1))
      return [1, ELLIPSIS, totalPages - 2, totalPages - 1, totalPages];
    return [
      1,
      ELLIPSIS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      ELLIPSIS,
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const pageNumber = Number(target.textContent);
    if (!isNaN(pageNumber)) goToPage(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button}
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => goToPage(currentPage - 1)}
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
              currentPage !== item && styles.pagination__button_noActive,
            )}
            disabled={item === ELLIPSIS}
          >
            {item}
          </Button>
        ))}
      </div>
      <button
        className={styles.pagination__button}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => goToPage(currentPage + 1)}
      >
        <ArrowSideIcon />
      </button>
    </div>
  );
};

export default Pagination;
