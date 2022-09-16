
import { Box, Title, Page, useStore, zmp } from 'zmp-framework/react';
import BookingItem from "../components/book/booking-item";
import React,{ useEffect } from 'react';
import store from '../store';
import setHeader from '../services/header';
import { changeStatusBarColor } from '../services/navigation-bar';
import {
  showNavigationBar,
  hideNavigationBar,
} from '../components/navigation-bar';
function BookingPage() {
  const bookings: any = useStore('bookings');
  const loading = useStore('loadingBookingItem');
  useEffect(() => {
    if (!bookings?.length) {
      store.dispatch('setBooking');
    }
  }, []);
  if (loading)
  {
    return (
      <React.Fragment key={loading}>
        <div>
          <Page
            className='relative  bg-white overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'
            onPageBeforeIn={() => {
              showNavigationBar();
              zmp.toolbar.show('#view-booking-list', true);
              setHeader({ title: 'Booking list', type: 'primary' });
              changeStatusBarColor('secondary');
            }}
          >
            <BookingItem loading booking={undefined} />
            <BookingItem loading booking={undefined} />
          </Page>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment key={bookings}>
      <Page
        onPageBeforeIn={() => {
          showNavigationBar;
          zmp.toolbar.show('#main-nav', true);
          setHeader({ title: 'Booking list', type: 'primary' });
          changeStatusBarColor('secondary');
        }}
        onPageBeforeOut={showNavigationBar}
        name='booking-list'
        key='booking-list'
        className='relative  bg-white overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'
      >
        <Box mx='4' mt='5'>
          <Title size='large'>DS đặt phòng</Title>
        </Box>
        {bookings.length === 0 ? (
          <Box className='text-center' mt='10'>
            Bạn chưa có booking nào
          </Box>
        ) : (
          <>
            {bookings.map((booking) => (
              <Box key={booking.sn} my='4'>
                <React.Fragment key={booking.sn}>
                  <BookingItem loading={false} booking={booking} />
                </React.Fragment>
              </Box>
            ))}
          </>
        )}
      </Page>
    </React.Fragment>
  );
}

export default BookingPage;
