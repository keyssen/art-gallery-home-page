import React, { FC, memo } from 'react';
import cn from 'classnames/bind';
import styles from './PaintingList.module.scss';
import Painting from './Painting/Painting';
import { IViewPainting } from '../../Types/types';

const cx = cn.bind(styles);

interface IPaintingListProps {
  className: string;
  paintings: IViewPainting[];
  isLoaded: boolean;
}

const PaintingList: FC<IPaintingListProps> = memo(
  ({ className, paintings, isLoaded }) => (
    <div
      className={cx('PaintingList', className, {
        'PaintingList--loaded': isLoaded
      })}
    >
      {paintings.map((painting) => (
        <Painting painting={painting} key={painting.id} />
      ))}
    </div>
  )
);

export default PaintingList;
