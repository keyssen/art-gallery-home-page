import React, { memo, useContext } from 'react';
import cn from 'classnames/bind';
import logo from '../../../../svg/logo.svg';
import { ReactComponent as Sun } from '../../../../svg/sun.svg';
import styles from './Header.module.scss';
import { ThemeContext } from '../../../../providers/ThemeProvider';

const cx = cn.bind(styles);

const Header = memo(() => {
  const { isLightTheme, setIsThemeLight } = useContext(ThemeContext);
  return (
    <div className={cx('Header')}>
      <img
        src={logo}
        className={cx('Header__logo')}
        alt="Framework Team Logo"
      />
      <Sun
        className={cx('Header__switch', 'svg')}
        onClick={() => setIsThemeLight(!isLightTheme)}
      />
    </div>
  );
});

export default Header;
