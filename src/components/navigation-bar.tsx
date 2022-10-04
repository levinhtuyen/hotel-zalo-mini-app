import { Link, Tabbar, zmp } from "zmp-framework/react";
import { useCurrentRoute } from "../hooks";
import { FaHome,FaGift,FaCalendarCheck } from 'react-icons/fa';
export const hideNavigationBar = () => {
  zmp.toolbar.hide("#app-tab-bar");
  zmp.$('.view-main')[0].classList.add('hidden-nav');
}

export const showNavigationBar = () => {
  zmp.toolbar.show("#app-tab-bar");
  zmp.$('.view-main')[0].classList.remove('hidden-nav');
}

function NavigationBar() {
  const [currentRoute] = useCurrentRoute();

  return (
    <Tabbar bottom id='app-tab-bar'>
      <Link
        href='/'
        animate={false}
        tabLinkActive={currentRoute.path === '/'}
      >
        <FaHome fontSize={24} /> Trang chủ
      </Link>
      <Link
        href='/promotion-list'
        animate={false}
        tabLinkActive={currentRoute.path.startsWith('/promotion-list')}
      >
        <FaGift fontSize={24} />  Promotion
      </Link>
      <Link
        href='/booking-list'
        animate={false}
        tabLinkActive={currentRoute.path.startsWith('/booking-list')}
      >
        <FaCalendarCheck fontSize={24} /> Booking của tôi
      </Link>
    </Tabbar>
  );
}

export default NavigationBar;
