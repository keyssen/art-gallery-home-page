import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './Input.module.scss';

const cx = cn.bind(styles);

interface IInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  maxLength: number;
  isLightTheme: boolean;
}

const Input: FC<IInputProps> = memo(
  ({ value, setValue, placeholder, maxLength, isLightTheme }) => (
    <input
      className={cx('Input', {
        'Input--light': isLightTheme,
        'Input--dark': !isLightTheme
      })}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  )
);

export default Input;
