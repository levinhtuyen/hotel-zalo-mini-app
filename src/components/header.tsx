import { useMemo } from "react";
import {
  Box,
  Link,
  Title,
  Navbar,
  zmp,
  NavTitle,
  NavLeft,
  NavRight,
  Icon,
  ActionsButton,
} from 'zmp-framework/react';
import { useCurrentRoute, useHotel } from "../hooks";
import appConfig from '../../app-config.json';
import parseQueryString from "@utils/getParams";

function Header({back}) {
  const [currentRoute] = useCurrentRoute();
  const title = useMemo(() => {

    return appConfig.app.title;
  }, [currentRoute])

  const backToPage = () =>
  {
    if (!back)
    {
      return
    }
    const query = parseQueryString(
      zmp.views.main.history[zmp.views.main.history.length - 2]
    ) as any
    var urlPath =
      zmp.views.main.history[zmp.views.main.history.length - 2]?.split('/?');
    zmp.views.main.router.navigate({
      path: urlPath[0],
      query: query ? query : '',
    });
  };
  return (
    <>
      <Navbar>
        <NavLeft>
          <Link className='no-ripple' noLinkClass onClick={backToPage}>
            <Icon zmp='zi-arrow-left' />
          </Link>
        </NavLeft>
        <NavTitle>{title}</NavTitle>
        <NavRight>
          {/* Thêm các button tuỳ chỉnh */}
          <ActionsButton />
        </NavRight>
      </Navbar>
    </>
  );
}
Header.displayName = 'zmp-navbar';
export default Header;
