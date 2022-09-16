import { Link, Tabbar, zmp } from "zmp-framework/react";
import { useCurrentRoute } from "../hooks";

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
        animate={true}
        tabLink='#view-main'
        iconZMP='zi-home'
        tabLinkActive={currentRoute.path === '/'}
      >
        Trang chủ
      </Link>
      <Link
        href='/hotel-list'
        animate={true}
        tabLink='#view-hotel-list'
        iconZMP='zi-check-circle'
        tabLinkActive={currentRoute.path.startsWith('/hotel-list')}
      >
        History
      </Link>
      <Link
        href='/booking-list'
        animate={true}
        tabLink='#view-booking-list'
        iconZMP='zi-calendar'
        tabLinkActive={currentRoute.path.startsWith('/booking-list')}
      >
        Đặt phòng
      </Link>
    </Tabbar>
  );
}

export default NavigationBar;
