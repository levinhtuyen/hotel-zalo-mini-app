
import { Box, Title, Page, useStore } from 'zmp-framework/react';
import BookingItem from "../components/book/booking";
import { useEffect } from 'react';
import store from '../store';

function BookingPage() {
  const bookings: any = useStore('bookings');
  useEffect(() => {
    if (!bookings?.length) {
      store.dispatch('setBooking');
    }
  }, []);

  return (
    <Page className='relative  bg-white overflow-hidden p-0 restaurant-with-cover h-50 max-h-full'>
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
              <BookingItem booking={booking} />
            </Box>
          ))}
        </>
      )}
    </Page>
  );
}

export default BookingPage;
