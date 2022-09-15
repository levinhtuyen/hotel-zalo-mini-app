
import { useStore, zmp, Box, Icon, Title, Link } from 'zmp-framework/react';
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

const Header = () => {
  const {
    route,
    hasLeftIcon,
    rightIcon,
    customTitle,
    type,
  }: HeaderType = useStore('header');
  const [currentRoute] = useCurrentRoute();
  const title = useMemo(() => {
    return appConfig.app.title;
  }, [currentRoute]);

  const { headerColor, textColor, iconColor } = typeColor[type! || 'primary'];
  return (
    <div className={cx('sticky z-50', headerColor, textColor)}>
      <Box
        className={cx(
          'sticky top-0 z-50 w-ful my-0 py-[10px] align-middle',
          headerColor,
          textColor
        )}
      >
        <Title size='small' className='flex items-center m-0'>
          {currentRoute.path !== '/' && (
            <Link
              onClick={() =>
                route
                  ? zmp.views.main.router.navigate(route)
                  : zmp.views.main.router.back('')
              }
              iconZMP='zi-arrow-left'
              className='pl-2 pr-4'
              back
            />
          )}
          {title}
        </Title>
      </Box>
    </div>
  );
};
export default Header;
