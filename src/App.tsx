import React from 'react';
import Main from './Pages/Main/Main';
import { ThemeProvider } from './providers/ThemeProvider';
import { FilterProvider } from './providers/FilterProvider';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.App}>
    <ThemeProvider>
      <FilterProvider>
        <Main />
      </FilterProvider>
    </ThemeProvider>
  </div>
);

export default App;
