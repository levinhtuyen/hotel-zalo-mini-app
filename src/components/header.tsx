import { useMemo } from "react";
import { Box, Link, Title, Navbar } from 'zmp-framework/react';
import { useCurrentRoute, useHotel } from "../hooks";
import appConfig from '../../app-config.json';

function Header({ back }) {
  const [currentRoute] = useCurrentRoute();

  const hotel = useHotel(Number(currentRoute.query?.id));

  const title = useMemo(() => {
    if (currentRoute.path === '/hotel/') {
      if (hotel) {
        return hotel.name;
      }
    }
    return appConfig.app.title;
  }, [currentRoute]);

  return (
    <Navbar backLink={back} className='h-11' slot='fixed' noHairline noShadow>
      <Title size='small' className='flex items-center'>
        {currentRoute.path !== '/' && (
          <Link iconZMP='zi-arrow-left' className='pl-2 pr-4' back />
        )}
        {title}
      </Title>
    </Navbar>
  );
}
Header.displayName = 'zmp-navbar';
export default Header;
