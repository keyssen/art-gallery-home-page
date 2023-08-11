import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './Painting.module.scss';
import { IViewPainting } from '../../../Types/types';

const cx = cn.bind(styles);

interface IPaintingProps {
  painting: IViewPainting;
}

const Painting: FC<IPaintingProps> = ({ painting }) => (
  <div className={cx('Painting')}>
    <div
      className={cx('Painting__img')}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${painting.imageUrl})`
      }}
    />
    <div className={cx('Painting__overlay')}>
      <h1 className={cx('Painting__name')}>{painting.name}</h1>
      <p className={cx('Painting__overlay-paragraph')}>
        <span className={cx('Painting__overlay-span')}>Author: </span>
        {painting.author}
      </p>
      <p className={cx('Painting__overlay-paragraph')}>
        <span className={cx('Painting__overlay-span')}>Created: </span>
        {painting.created}
      </p>
      <p className={cx('Painting__overlay-paragraph')}>
        <span className={cx('Painting__overlay-span')}>Location: </span>
        {painting.location}
      </p>
    </div>
  </div>
);

export default Painting;
