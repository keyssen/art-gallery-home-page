import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import s from "./Pagination.module.scss";

const Pagination = ({
  isThemeLight,
  currentPage,
  setCurrentPage,
  pages,
  maxPage,
}) => {
  return (
    <div className={s.pagination}>
      <button
        className={`${s.pagination__angel} ${s.double__left} ${
          isThemeLight ? s.pagination__page_light : s.pagination__page_dark
        }`}
        disabled={1 === currentPage}
        onClick={(e) => {
          setCurrentPage(1);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} rotation={180} />
      </button>
      <button
        className={`${s.pagination__angel} ${
          isThemeLight ? s.pagination__page_light : s.pagination__page_dark
        }`}
        disabled={1 === currentPage}
        onClick={(e) => {
          setCurrentPage(currentPage - 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} rotation={180} />
      </button>
      {pages?.map((page, index) => (
        <button
          className={`${s.pagination__page} ${
            isThemeLight ? s.pagination__page_light : s.pagination__page_dark
          }`}
          disabled={page === currentPage}
          key={page}
          onClick={(e) => {
            setCurrentPage(page);
          }}
        >
          {page}
        </button>
      ))}
      <button
        className={`${s.pagination__angel} ${
          isThemeLight ? s.pagination__page_light : s.pagination__page_dark
        }`}
        disabled={maxPage === currentPage}
        onClick={(e) => {
          setCurrentPage(currentPage + 1);
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <button
        className={`${s.pagination__angel} ${s.double__right} ${
          isThemeLight ? s.pagination__page_light : s.pagination__page_dark
        }`}
        disabled={maxPage === currentPage}
        onClick={(e) => {
          setCurrentPage(maxPage);
        }}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default Pagination;