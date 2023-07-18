import React, { FC, memo, useContext } from 'react';
import Input from '../UI/Input/Input';
import SelectForInput from '../UI/Selects/SelectForInput/SelectForInput';
import Select from '../UI/Selects/Select/Select';
import s from './Filter.module.scss';
import { IAuthor, ILocation } from '../../API/Interface';
import { ThemeContext } from '../../../../providers/ThemeProvider';
import { FilterContext } from '../../../../providers/FilterProvider';

interface IFilter {
  authors: IAuthor[];
  locations: ILocation[];
}

const Filter: FC<IFilter> = memo(({ authors, locations }) => {
  const { isLightTheme } = useContext(ThemeContext);

  const {
    selectedAuthorID,
    setSelectedAuthorId,
    selectedLocationId,
    setSelectedLocationId,
    paintingName,
    setPaintingName,
    dateValue,
    setDateValue
  } = useContext(FilterContext);

  return (
    <div className={s.filter}>
      <Input
        isLightTheme={isLightTheme}
        placeholder="Name"
        maxLength={45}
        value={paintingName}
        setValue={setPaintingName}
      />
      <Select
        isLightTheme={isLightTheme}
        value={selectedAuthorID}
        selectedName="name"
        setValue={setSelectedAuthorId}
        defaultValue="Author"
        options={authors}
      />
      <Select
        isLightTheme={isLightTheme}
        value={selectedLocationId}
        selectedName="location"
        setValue={setSelectedLocationId}
        defaultValue="Location"
        options={locations}
      />
      <SelectForInput
        isLightTheme={isLightTheme}
        value={dateValue}
        setValue={setDateValue}
      />
    </div>
  );
});

export default Filter;
