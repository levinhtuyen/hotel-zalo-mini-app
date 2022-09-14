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
  useStore,
  ActionsButton,
} from 'zmp-framework/react';
import { useCurrentRoute, useHotel } from "../hooks";
import { HeaderType } from '../models';
import appConfig from '../../app-config.json';

function Header() {
  const [currentRoute] = useCurrentRoute();
  const title = useMemo(() => {

    return appConfig.app.title;
  }, [currentRoute])
    const {
      route
    }: HeaderType = useStore('header');
  return (
    <Navbar>
      <NavLeft>
        <Link
          className='no-ripple'
          noLinkClass
          onClick={() =>
            route
              ? zmp.views.main.router.navigate(route, {
                  transition: 'zmp-fade',
                })
              : zmp.views.main.router.back('', { transition: 'zmp-fade' })
          }
        >
          <Icon zmp='zi-arrow-left' />
        </Link>
      </NavLeft>
      <NavTitle>{title}</NavTitle>
      <NavRight>
        {/* Thêm các button tuỳ chỉnh */}
        <ActionsButton />
      </NavRight>
    </Navbar>
  );
}
Header.displayName = 'zmp-navbar';
export default Header;
