
import { Box, Title, Page, useStore, zmp } from 'zmp-framework/react';
import BookingItem from "../components/book/booking-item";
import { useEffect } from 'react';
import store from '../store';
import Header from '@components/header';
import {
  hideNavigationBar,
  showNavigationBar,
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
      <Page className='relative  bg-white overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'>
        <BookingItem loading booking={undefined} />
        <BookingItem loading booking={undefined} />
      </Page>
    );
  }
  return (
    <Page
      onPageBeforeIn={() => {
        zmp.toolbar.show('#main-nav', true);
      }}
      name="booking-list"
      key='booking-list'
      onPageBeforeOut={showNavigationBar}
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
              <BookingItem loading={false} booking={booking} />
            </Box>
          ))}
        </>
      )}
    </Page>
  );
}

export default BookingPage;
