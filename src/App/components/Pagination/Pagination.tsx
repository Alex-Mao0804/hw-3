import React from "react";
import styles from "./Pagination.module.scss";
import ArrowPaginationIcon from "@components/icons/ArrowPaginationIcon";
import clsx from "clsx";
import Button from "@components/Button";

export type TPaginationProps = {
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<TPaginationProps> = ({
  pageCount,
  page,
  setPage,
}) => {
  const handlePageChange = (page: number) => {
    if (page > pageCount || page < 1) return;
    setPage(page);
  };

  const getPaginationGroup = () => {
    if (pageCount <= 4)
      return Array.from({ length: pageCount }, (_, i) => i + 1);

    if (page <= 3) {
      return [1, 2, 3, "...", pageCount];
    } else if (page >= pageCount - 2) {
      return [1, "...", pageCount - 2, pageCount - 1, pageCount];
    } else {
      return [1, "...", page - 1, page, page + 1, "...", pageCount];
    }
  };

  const changePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const pageNumber = Number((e.target as HTMLButtonElement).textContent);
    setPage(pageNumber);
  };
  return (
    <div className={styles.pagination}>
      <button
        className={styles.pagination__button}
        disabled={page === 1 ? true : false}
        onClick={() => handlePageChange(page - 1)}
      >
        <ArrowPaginationIcon />
      </button>
      <div>
        {getPaginationGroup().map((item, index) => (
          <Button
            key={index}
            onClick={changePage}
            className={clsx(
              styles.pagination__button_group,
              page !== item && styles.pagination__button_noActive,
            )}
            disabled={item === "..."}
          >
            {item}
          </Button>
        ))}
      </div>
      <button
        className={styles.pagination__button}
        disabled={page === pageCount ? true : false}
        onClick={() => handlePageChange(page + 1)}
      >
        <ArrowPaginationIcon />
      </button>
    </div>
  );
};

export default Pagination;
