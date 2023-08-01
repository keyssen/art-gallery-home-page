import React, { FC, memo, useRef, useState } from 'react';
import cn from 'classnames/bind';
import styles from './Select.module.scss';
import { ReactComponent as Cross } from '../../../../../../svg/cross.svg';
import { IOption } from '../../../../Types/types';
import useOutsideClick from '../../../../hooks/useOutsideClick';
import SelectTriange from './SelectTriange/SelectTriange';

const cx = cn.bind(styles);

interface ISelectProps {
  defaultValue: string;
  value: number;
  setValue: (value: number) => void;
  options: IOption[];
  isLightTheme: boolean;
}

const Select: FC<ISelectProps> = memo(
  ({ defaultValue, value, setValue, options, isLightTheme }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const [isActive, setIsActive] = useState(false);

    const [selected, setSelected] = useState<string>('');

    const selectRef = useRef<HTMLDivElement>(null);

    const [isScrollerAtBottom, setIsScrollerAtBottom] = useState(false);

    const toggleOpen = () => setIsActive(false);

    useOutsideClick(itemRef, toggleOpen);

    const scrollerAtBottom = () => {
      const scrollTop = selectRef.current?.scrollTop;
      const scrollHeight = selectRef.current?.scrollHeight;
      const clientHeight = selectRef.current?.clientHeight;
      if (scrollHeight && clientHeight && scrollTop) {
        scrollHeight <= clientHeight + scrollTop
          ? setIsScrollerAtBottom(true)
          : setIsScrollerAtBottom(false);
      }
    };

    return (
      <div className={cx('Select')} ref={itemRef}>
        <div
          className={cx('Select__button', {
            'Select__button--active': isActive,
            'Select__button--light': isLightTheme,
            'Select__button--dark': !isLightTheme
          })}
          onClick={() => {
            setIsActive(!isActive);
            setIsScrollerAtBottom(false);
          }}
        >
          <span className={cx('Select__button__text')}>
            {selected || defaultValue}
          </span>
          <div className={cx('Select__buttonIcons')}>
            {value ? (
              <Cross
                className={cx('Select__buttonIcons-close')}
                onClick={() => {
                  setSelected('');
                  setValue(0);
                }}
              />
            ) : (
              ''
            )}
            <SelectTriange
              isActive={isActive}
              className={cx('Select__buttonIcons-open')}
              selectRef={selectRef}
              isScrollerAtBottom={isScrollerAtBottom}
            />
          </div>
        </div>
        {isActive && (
          <div
            className={cx('Select__container', {
              'Select__container--light': isLightTheme,
              'Select__container--dark': !isLightTheme
            })}
          >
            <div
              className={cx('Select__dividingLine', {
                'Select__dividingLine--light': isLightTheme,
                'Select__dividingLine--dark': !isLightTheme
              })}
            />
            <div
              ref={selectRef}
              onScroll={scrollerAtBottom}
              className={cx('Select__content')}
            >
              {options.map((option) => (
                <div
                  key={option.id}
                  className={cx('Select__option', {
                    'Select__option--light': isLightTheme,
                    'Select__option--dark': !isLightTheme
                  })}
                  onClick={() => {
                    setValue(option.id);
                    setSelected(option.name);
                  }}
                >
                  <span>{option.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default Select;
