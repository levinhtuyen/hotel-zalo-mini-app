
import { useStore, zmp, Box, Icon } from 'zmp-framework/react';
import { cx } from '../utils';
import { HeaderType } from '../models';
import { useCurrentRoute } from '../hooks';
import React from 'react'
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
    title,
    customTitle,
    type,
  }: HeaderType = useStore('header');
  const [currentRoute] = useCurrentRoute();
  const { headerColor, textColor, iconColor } = typeColor[type! || 'primary'];
  return (
    <React.Fragment key={'header'}>
      <div className={cx('sticky top-0 z-50 w-ful', headerColor, textColor)}>
        <Box
          flex
          alignItems='center'
          justifyContent='space-between'
          className='h-[44px] pl-5 pr-[110px] gap-3 w-full'
          m='0'
        >
          <>
            {hasLeftIcon && currentRoute.path !== '/' && (
              <Icon
                zmp='zi-arrow-left'
                className={iconColor}
                onClick={() =>
                  route
                    ? zmp.views.main.router.navigate(route, {
                        transition: 'zmp-fade',
                      })
                    : zmp.views.main.router.back('', { transition: 'zmp-fade' })
                }
              />
            )}
            {customTitle || (
              <div className={cx('text-lg font-medium')}>{title}</div>
            )}
          </>
          {rightIcon || <div />}
        </Box>
      </div>
    </React.Fragment>
  );
};

export default Header;
