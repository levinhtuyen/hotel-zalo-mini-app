import { useMemo } from "react";
import { Box, Link, Title } from "zmp-framework/react";
import { useCurrentRoute, useHotel } from "../hooks";
import appConfig from '../../app-config.json';

function Header() {
  const [currentRoute] = useCurrentRoute();

  const hotel = useHotel(Number(currentRoute.query?.id));

  const title = useMemo(() => {
    if (currentRoute.path === '/hotel/') {
      if (hotel) {
        return hotel.name
      }
    }
    return appConfig.app.title;
  }, [currentRoute])

  return <Box className="header">
    <Title size="small" className="flex items-center">
      {currentRoute.path !== '/' && <Link iconZMP="zi-arrow-left" className="pl-2 pr-4" back />}
      {title}
    </Title>
  </Box>;
}

export default Header;
