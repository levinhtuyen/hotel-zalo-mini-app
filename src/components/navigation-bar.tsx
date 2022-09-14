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
    <>
      <Tabbar bottom id='app-tab-bar'>
        <Link
          href='/'
          animate={false}
          iconZMP='zi-home'
          tabLinkActive={currentRoute.path === '/'}
        >
          Trang chủ
        </Link>
        <Link
          href='/hotel-list'
          animate={true}
          iconZMP='zi-bookmark'
          tabLinkActive={currentRoute.path.startsWith('/hotel-list')}
        >
          History
        </Link>
        <Link
          href='/booking-list'
          animate={true}
          iconZMP='zi-calendar'
          tabLinkActive={currentRoute.path.startsWith('/booking-list')}
        >
          Đặt phòng
        </Link>
      </Tabbar>

      <Link
        className='display-none'
        href='/hotel-detail/'
        tabLinkActive={currentRoute.path.startsWith('/hotel-detail/')}
      >
        Hotel detail
      </Link>
      <Link
        className='display-none'
        href='/booking-detail/'
        tabLinkActive={currentRoute.path.startsWith('/booking-detail/')}
      >
        booking detail
      </Link>
    </>
  );
}

export default NavigationBar;
