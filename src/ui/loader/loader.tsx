import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';
import { FC } from 'react';

const loaderSizes = {
  small: 16,
  medium: 24,
  large: 40
};

interface ILoader {
  size?: keyof typeof loaderSizes;
  inverse?: boolean;
}

export const Loader: FC<ILoader> = ({ size = 'large', inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';

  const wrapperStyleKey = 'wrapper_' + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};