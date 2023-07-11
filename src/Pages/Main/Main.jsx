import React, { useContext, useEffect, useState } from 'react';
import s from './Main.module.scss';
import PaintingList from './components/PaintingList/PaintingList';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import { useReplaceFieldsIdInPaintings } from './hooks/useReplaceFieldsIdInPaintings';
import QueryService from './API/QueryService';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './components/utils/pages';
import { ThemeContext } from '../../providers/ThemeProvider';
import { host, limit } from './Consts';
import Header from './components/Header/Header';

const Main = () => {
	const [paintingName, setPaintingName] = useState('');

	const [paintings, setPaintings] = useState([]);

	const [authors, setAuthors] = useState([]);

	const [selectedAuthorID, setSelectedAuthorId] = useState(0);

	const [locations, setLocations] = useState([]);

	const [selectedLocationId, setSelectedLocationId] = useState(0);

	const [currentPage, setCurrentPage] = useState(1);

	const [totalPages, setTotalPages] = useState(0);

	const [dateValue, setDateValue] = useState({ from: '', before: '' });

	const newPaintings = useReplaceFieldsIdInPaintings(
		paintings,
		authors,
		locations
	);
	const { isThemeLight } = useContext(ThemeContext);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedAuthorID, selectedLocationId, paintingName, dateValue]);

	useEffect(() => {
		getAuthors().then((authors) => setAuthors(authors));
		getLocations().then((locations) => setLocations(locations));
	}, []);

	useEffect(() => {
		fetchPaintings();
	}, [
		selectedAuthorID,
		selectedLocationId,
		paintingName,
		dateValue,
		currentPage
	]);

	const [fetchPaintings, paintingError, isLoaded] = useFetching(async () => {
		const response = await QueryService.getPaintings(
			host,
			currentPage,
			limit,
			selectedAuthorID,
			selectedLocationId,
			paintingName,
			dateValue
		);
		setPaintings(response.data);
		const totalCount = response.headers.get('x-total-count');
		setTotalPages(getPageCount(totalCount, limit));
	});

	const getAuthors = async () => {
		return await QueryService.getAuthors(host);
	};

	const getLocations = async () => {
		return await QueryService.getLocations(host);
	};

	return (
		<div className={`${s.page} ${isThemeLight ? s.page__light : s.page__dark}`}>
			<Header />
			<Filter
				paintingName={paintingName}
				setPaintingName={setPaintingName}
				selectedAuthorID={selectedAuthorID}
				setSelectedAuthorId={setSelectedAuthorId}
				authors={authors}
				selectedLocationId={selectedLocationId}
				setSelectedLocationId={setSelectedLocationId}
				locations={locations}
				dateValue={dateValue}
				setDateValue={setDateValue}
			/>
			{paintingError && (
				<h1 style={{ display: 'flex', justifyContent: 'center' }}>
					Произошла ошибка {paintingError}
				</h1>
			)}
			<PaintingList paintings={newPaintings} isLoaded={isLoaded} />
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
