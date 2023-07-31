import React, { FC, memo, useContext } from 'react';
import cn from 'classnames/bind';
import styles from './Pagination.module.scss';
import { ReactComponent as AnglesLeft } from '../../../../svg/anglesLeft.svg';
import { ReactComponent as AngleLeft } from '../../../../svg/angleLeft.svg';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { usePagination } from '../../hooks/usePagination';

const cx = cn.bind(styles);

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: FC<IPaginationProps> = memo(
  ({ totalPages, currentPage, setCurrentPage }) => {
    const { isLightTheme } = useContext(ThemeContext);

    const PaginationPages = usePagination(totalPages, currentPage);

    return (
      <div className={cx('Pagination')}>
        <button
          type="button"
          className={cx('Pagination__angle', 'Pagination__angle--double_left', {
            Pagination__page__light: isLightTheme,
            Pagination__page__dark: !isLightTheme
          })}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          <AnglesLeft />
        </button>
        <button
          type="button"
          className={cx('Pagination__angle', {
            Pagination__page__light: isLightTheme,
            Pagination__page__dark: !isLightTheme
          })}
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          <AngleLeft />
        </button>
        {PaginationPages.map((page) => (
          <button
            type="button"
            className={cx('Pagination__page', {
              Pagination__page__light: isLightTheme,
              Pagination__page__dark: !isLightTheme
            })}
            disabled={page === currentPage}
            key={page}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          className={cx('Pagination__angle', {
            Pagination__page__light: isLightTheme,
            Pagination__page__dark: !isLightTheme
          })}
          disabled={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          <AngleLeft style={{ transform: 'rotate(180deg)' }} />
        </button>
        <button
          type="button"
          className={cx(
            'Pagination__angle',
            'Pagination__angle--double_right',
            {
              Pagination__page__light: isLightTheme,
              Pagination__page__dark: !isLightTheme
            }
          )}
          disabled={totalPages === currentPage}
          onClick={() => {
            setCurrentPage(totalPages);
          }}
        >
          <AnglesLeft style={{ transform: 'rotate(180deg)' }} />
        </button>
      </div>
    );
  }
);

export default Pagination;
