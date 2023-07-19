import React, { FC } from 'react';
import cn from 'classnames/bind';
import styles from './Painting.module.scss';
import { IViewPainting } from '../../../types/types';

const cx = cn.bind(styles);

interface IPaintingProps {
  painting: IViewPainting;
}

const Painting: FC<IPaintingProps> = ({ painting }) => (
  <div className={cx('catalog__painting')}>
    <div
      className={cx('catalog__painting__img')}
      style={{
        backgroundImage: `url(${process.env.REACT_APP_BASE_URL}${painting.imageUrl})`
      }}
    />
    <div className={cx('catalog__painting__overlay')}>
      <h1 className={cx('painting__name')}>{painting.name}</h1>
      <p>
        <span>Author:</span>
        {painting.author}
      </p>
      <p>
        <span>Created:</span>
        {painting.created}
      </p>
      <p>
        <span>Location:</span>
        {painting.location}
      </p>
    </div>
  </div>
);

export default Painting;