
import { useStore, zmp, Box, Icon, Title, Link, Button } from 'zmp-framework/react';
import { useMemo } from 'react';
import { cx } from '../utils';
import { HeaderType } from '../models';
import appConfig from '../../app-config.json';
import { useCurrentRoute, useHotel } from '../hooks';

const typeColor = {
  primary: {
    headerColor: 'bg-primary',
    textColor: 'text-white',
    iconColor: 'text-white',
  },
  secondary: {
    headerColor: 'bg-white',
    textColor: 'text-black',
    iconColor: 'text-gray-400',
  },
};

const Header = (back) => {
  const {
    route,
    type,
  }: HeaderType = useStore('header');

  const { headerColor, textColor, iconColor } = typeColor[type! || 'primary'];
  return (
    <div className={cx('sticky z-50', headerColor, textColor)}>
      <Box
        className='sticky top-0 z-50 w-ful my-0 py-[10px] align-middle bg-primary text-white'
      >
        <Title size='small' className='flex items-center m-0'>
          <Link back iconZMP='zi-arrow-left'></Link>
          ZMP Hotel Go2Joy
        </Title>
      </Box>
    </div>
  );
};
Header.displayName = 'zmp-navbar';
export default Header;
