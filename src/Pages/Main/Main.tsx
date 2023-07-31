import React, { useContext, useEffect, useState } from 'react';
import { AxiosHeaders } from 'axios';
import cn from 'classnames/bind';
import styles from './Main.module.scss';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import { useReplaceFieldsIdInPaintings } from './hooks/useReplaceFieldsIdInPaintings';
import QueryService from './API/QueryService';
import { getPageCount } from './components/utils/pages';
import { ThemeContext } from '../../providers/ThemeProvider';
import Header from './components/Header/Header';
import { IOption, IPainting } from './Types/types';
import { useFetching } from './hooks/useFetching';
import { FilterContext } from '../../providers/FilterProvider';

const cx = cn.bind(styles);

const Main = () => {
  const { isLightTheme } = useContext(ThemeContext);

  const [paintings, setPaintings] = useState<IPainting[]>([]);

  const [authors, setAuthors] = useState<IOption[]>([]);

  const [locations, setLocations] = useState<IOption[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const { selectedAuthorID, selectedLocationId, paintingName, dateValue } =
    useContext(FilterContext);

  const [newPaintings, isLoaded] = useReplaceFieldsIdInPaintings(
    paintings,
    authors,
    locations
  );

  useEffect(() => {
    QueryService.getAuthors().then((res) => setAuthors(res));
    QueryService.getLocations().then((res) => setLocations(res));
  }, []);

  const [fetchPaintings, paintingError] = useFetching(async () => {
    const response = await QueryService.getPaintings({
      currentPage,
      selectedAuthorID,
      selectedLocationId,
      paintingName,
      dateValue
    });
    setPaintings(response.data);
    const headers = response.headers as AxiosHeaders;
    const totalCount = Number(headers.get('x-total-count'));
    setTotalPages(getPageCount(totalCount));
  });

  useEffect(() => {
    fetchPaintings();
  }, [
    currentPage,
    selectedAuthorID,
    selectedLocationId,
    dateValue,
    paintingName
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

  return (
    <div
      className={cx('Main', {
        'Main--light': isLightTheme,
        'Main--dark': !isLightTheme
      })}
    >
      <Header />
      <Filter authors={authors} locations={locations} />
      {paintingError ? (
        <div>{paintingError}</div>
      ) : (
        <PaintingList paintings={newPaintings} isLoaded={isLoaded} />
      )}
      {newPaintings.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Main;
