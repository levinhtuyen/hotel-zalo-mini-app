import { useMemo } from "react";
import {
  Box,
  Link,
  NavTitleLarge,
  Navbar,
  NavLeft,
  Icon,
  ActionsButton,
  NavRight,
} from 'zmp-framework/react';
import { useCurrentRoute } from "../hooks";
import appConfig from '../../app-config.json';

function Header({ back }) {
  const [currentRoute] = useCurrentRoute();

  const title = useMemo(() => {
    return appConfig.app.title;
  }, [currentRoute]);
  const logo = 'https://go2joy.vn/images/logo-mini.png';
  return (
    <>
      <Navbar>
        <NavLeft>
          <Link className='no-ripple' noLinkClass back>
            <Icon zmp='zi-arrow-left' />
          </Link>
        </NavLeft>
        <NavTitleLarge>{title}</NavTitleLarge>
        <NavRight>
          <img className='logo-nav' src={logo} alt='' />
          <ActionsButton />
        </NavRight>
      </Navbar>
    </>
  );
}
Header.displayName = 'zmp-navbar';
export default Header;
