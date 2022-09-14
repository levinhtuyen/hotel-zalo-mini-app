import { useMemo } from "react";
import { Box, Link, Title, Navbar, NavLeft, Icon } from 'zmp-framework/react';
import { useCurrentRoute, useHotel } from "../hooks";
import appConfig from '../../app-config.json';

function Header({ back }) {
  const [currentRoute] = useCurrentRoute();

  const title = useMemo(() => {
    return appConfig.app.title;
  }, [currentRoute]);

  return (
    <Navbar slot='fixed' backLink={back}>
      <Box className='header'>
        <Title size='small' className='flex items-center'>
          {currentRoute.path !== '/' && (
            <Link iconZMP='zi-arrow-left' className='pl-2 pr-4' back />
          )}
          {title}
        </Title>
      </Box>
    </Navbar>
  );
}
Header.displayName = 'zmp-navbar';
export default Header;
