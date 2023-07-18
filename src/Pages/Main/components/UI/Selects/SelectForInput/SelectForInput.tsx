import React, {
  FC,
  memo,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import s from './SelectForInput.module.scss';
import { ReactComponent as DownTriangle } from '../../../../../../svg/downTriangle.svg';
import { ThemeContext } from '../../../../../../providers/ThemeProvider';

interface DateValue {
  before: string;
  from: string;
}

interface ISelectForInputProps {
  value: {
    before: string;
    from: string;
  };
  setValue: React.Dispatch<React.SetStateAction<DateValue>>;
}

const SelectForInput: FC<ISelectForInputProps> = memo(({ value, setValue }) => {
  const { isLightTheme } = useContext(ThemeContext);

  const itemRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeValueFrom = (from: string) => {
    if ((Number(from) > 0 && String(from).length < 5) || !from) {
      setValue({
        ...value,
        from
      });
    }
  };

  const changeValueBefore = (before: string) => {
    if ((Number(before) > 0 && String(before).length < 5) || !before) {
      setValue({
        ...value,
        before
      });
    }
  };

  return (
    <div className={s.container} ref={itemRef}>
      <div
        role="button"
        tabIndex={0}
        className={`${s.activation__button} ${
          isActive ? s.button__is__activated : ''
        }
              ${
                isLightTheme
                  ? s.activation__button__light
                  : s.activation__button__dark
              }`}
        onClick={() => setIsActive(!isActive)}
        onKeyDown={() => setIsActive(!isActive)}
      >
        <span>Created</span>
        <div className={s.open}>
          <DownTriangle />
        </div>
      </div>
      {isActive ? (
        <div
          className={`${s.content} ${
            isLightTheme ? s.content__light : s.content__dark
          }`}
        >
          <input
            className={`${s.input} ${isLightTheme ? s.input__light : ''}`}
            placeholder="from"
            type="number"
            value={value.from}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            onChange={(event) => changeValueFrom(event.target.value)}
          />
          —
          <input
            className={`${s.input} ${
              isLightTheme ? s.input__light : s.input__dark
            }`}
            placeholder="before"
            type="number"
            value={value.before}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') {
                e.preventDefault();
              }
            }}
            onChange={(event) => changeValueBefore(event.target.value)}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

export default SelectForInput;